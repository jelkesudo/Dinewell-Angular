import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {
  isButtonEnabled: boolean = true;

  ngOnInit(): void{
    this.tokenService.redirectToLoginIfTokenExpired();
    this.tokenService.redirectToHomeIfNotAdmin();
    this.buildForm();
  }

  restaurantForm: FormGroup = new FormGroup({});;

  constructor(private toastService:ToastService, private service:RestaurantService, private tokenService:TokenValidateServiceService, private router:Router, private fb: FormBuilder) {
    
  }

  buildForm() {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10),  Validators.maxLength(200)]],
      address: ['', [Validators.required, Validators.minLength(5),  Validators.maxLength(200)]],
      addressNumber: ['', [Validators.required, Validators.min(1)]],
      workFrom: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      workTo: ['', [Validators.required, Validators.min(0), Validators.max(23)]]
    });
  }

  onSubmit() {
    if (this.restaurantForm.valid) {
      this.isButtonEnabled = false;
      this.service.addRestaurant(this.restaurantForm).subscribe(
        (statusCode: number) => {
          console.log(statusCode);
          if (statusCode === 204) {
            alert("Added a restaurant");
            this.router.navigate(['/adminpage']);
          } else {
            alert("Failed to add restaurant.");
          }
        },
        (error: any) => {
          alert("Error occured.");
        }
      );
    } else {
      this.markFormGroupAsTouched(this.restaurantForm);
    }
  }
  
  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get nameInvalid() {
    const nameControl = this.restaurantForm.get('name');
    return nameControl?.touched && (nameControl?.invalid || !nameControl?.value);
  }

  get descriptionInvalid() {
    const descriptionControl = this.restaurantForm.get('description');
    return descriptionControl?.touched && (descriptionControl?.invalid || !descriptionControl?.value);
  }
  
  get addressInvalid() {
    const addressControl = this.restaurantForm.get('address');
    return addressControl?.touched && (addressControl?.invalid || !addressControl?.value);
  }
  
  get addressNumberInvalid() {
    const addressNumberControl = this.restaurantForm.get('addressNumber');
    return addressNumberControl?.touched && (addressNumberControl?.invalid || !addressNumberControl?.value);
  }
  
  get workFromInvalid() {
    const workFromControl = this.restaurantForm.get('workFrom');
    return workFromControl?.touched && (workFromControl?.invalid || !workFromControl?.value);
  }
  
  get workToInvalid() {
    const workToControl = this.restaurantForm.get('workTo');
    return workToControl?.touched && (workToControl?.invalid || !workToControl?.value);
  }
}
