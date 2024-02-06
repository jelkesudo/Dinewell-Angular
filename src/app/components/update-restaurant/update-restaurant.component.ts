import { Component } from '@angular/core';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRestaurantAdmin } from 'src/app/interfaces/iadminrestaurant';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})

export class UpdateRestaurantComponent {
  restaurant!: IRestaurantAdmin;
  retaurantId!: number;
  isButtonEnabled: boolean = true;
  restaurantUpdateForm: FormGroup = new FormGroup({});;
  constructor(private router:Router,private fb: FormBuilder, private service:RestaurantService, private activated:ActivatedRoute, private tokenService:TokenValidateServiceService){}
  ngOnInit(): void {
    this.tokenService.redirectToLoginIfTokenExpired();
    this.tokenService.redirectToHomeIfNotAdmin();
    this.retaurantId = Number(this.activated.snapshot.paramMap.get('id'));
    this.buildForm();
    this.getRestaurantInfo();
  }

  buildForm() {
    this.restaurantUpdateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10),  Validators.maxLength(200)]],
      address: ['', [Validators.required, Validators.minLength(5),  Validators.maxLength(200)]],
      addressNumber: ['', [Validators.required, Validators.min(1)]],
      workFrom: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      workTo: ['', [Validators.required, Validators.min(0), Validators.max(23)]]
    });
  }

  getRestaurantInfo():void{
    this.service.getSingleRestaurantAdmin(this.retaurantId).subscribe(
        (restaurant: IRestaurantAdmin) => {
          this.restaurant = restaurant;
        },
        (error) => {
          console.error('Error loading restaurant details:', error);
        }
    );
  }

  onSubmit() {
    if (this.restaurantUpdateForm.valid) {
      this.isButtonEnabled = false;
      this.service.addRestaurant(this.restaurantUpdateForm, this.restaurant.id).subscribe(
        (statusCode: number) => {
          console.log(statusCode);
          if (statusCode === 204) {
            alert("Successfuly updated a restaurant!");
            this.router.navigate(['/adminpage']);
          } else {
            alert("Failed to update restaurant.");
          }
        },
        (error: any) => {
          alert("Error occured.");
        }
      );
    } else {
      this.markFormGroupAsTouched(this.restaurantUpdateForm);
    }
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get nameInvalid() {
    const nameControl = this.restaurantUpdateForm.get('name');
    return nameControl?.touched && (nameControl?.invalid || !nameControl?.value);
  }

  get descriptionInvalid() {
    const descriptionControl = this.restaurantUpdateForm.get('description');
    return descriptionControl?.touched && (descriptionControl?.invalid || !descriptionControl?.value);
  }
  
  get addressInvalid() {
    const addressControl = this.restaurantUpdateForm.get('address');
    return addressControl?.touched && (addressControl?.invalid || !addressControl?.value);
  }
  
  get addressNumberInvalid() {
    const addressNumberControl = this.restaurantUpdateForm.get('addressNumber');
    return addressNumberControl?.touched && (addressNumberControl?.invalid || !addressNumberControl?.value);
  }
  
  get workFromInvalid() {
    const workFromControl = this.restaurantUpdateForm.get('workFrom');
    return workFromControl?.touched && (workFromControl?.invalid || !workFromControl?.value);
  }
  
  get workToInvalid() {
    const workToControl = this.restaurantUpdateForm.get('workTo');
    return workToControl?.touched && (workToControl?.invalid || !workToControl?.value);
  }
}
