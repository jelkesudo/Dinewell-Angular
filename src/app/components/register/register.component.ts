import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRegisterService } from 'src/app/services/login-register.service';
import { passwordValidator } from 'src/app/validators/custom-validators';
import { Router } from '@angular/router';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  registrationForm: FormGroup = new FormGroup({});

  constructor(private router:Router, private formBuilder: FormBuilder, private service:LoginRegisterService, private tokenService:TokenValidateServiceService) { }

  ngOnInit() {
    localStorage.removeItem("order");
    this.tokenService.redirectToHomeIfTokenNotExpired();
    this.buildForm();
  }

  buildForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Z].{2,}$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Z].{2,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
      username: ['', [Validators.required, Validators.pattern(/^[A-Z].{2,}$/)]],
      addressName: [''],
      addressNumber: ['']
    }, {
      validators: this.addressValidation.bind(this)
    });
  }
  addressValidation(formGroup: FormGroup) {
    const addressNameControl = formGroup.get('addressName');
    const addressNumberControl = formGroup.get('addressNumber');
  
    if (addressNameControl && addressNumberControl) {
      if (addressNameControl.value || addressNumberControl.value) {
        if (!addressNameControl.value) {
          addressNameControl.setErrors({ required: true });
        } else {
          addressNameControl.setErrors(null);
        }
  
        if (!addressNumberControl.value) {
          addressNumberControl.setErrors({ required: true });
        } else {
          addressNumberControl.setErrors(null);
        }
      } else {
        addressNameControl.setErrors(null);
        addressNumberControl.setErrors(null);
      }
    }
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      this.service.register(this.registrationForm).subscribe(
        (statusCode: number) => {
          if (statusCode === 201) {
            alert("Successfuly registered.");
            this.router.navigate(['/login']);
          } else {            
            alert("Failed to register user.");
          }
        },
        (error: any) => {
          alert("Error occurred.");
          console.error('Error occurred during registration:', error);
        }
      );
    } else {
      this.markFormGroupAsTouched(this.registrationForm);
    }
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get firstNameInvalid() {
    const firstNameControl = this.registrationForm.get('firstName');
    return firstNameControl?.touched && (firstNameControl?.invalid || !firstNameControl?.value);
  }

  get lastNameInvalid() {
    const lastNameControl = this.registrationForm.get('lastName');
    return lastNameControl?.touched && (lastNameControl?.invalid || !lastNameControl?.value);
  }

  get emailInvalid() {
    const emailControl = this.registrationForm.get('email');
    return emailControl?.touched && (emailControl?.invalid || !emailControl?.value);
  }

  get passwordInvalid() {
    const passwordControl = this.registrationForm.get('password');
    return passwordControl?.touched && (passwordControl?.invalid || !passwordControl?.value);
  }

  get usernameInvalid() {
    const usernameControl = this.registrationForm.get('username');

    return (usernameControl?.touched || usernameControl?.touched) && !usernameControl?.value && usernameControl?.value;
  }

  get addressNameInvalid() {
    const addressNameControl = this.registrationForm.get('addressName');
    const addressNumberControl = this.registrationForm.get('addressNumber');

    return (addressNameControl?.touched || addressNumberControl?.touched) && !addressNameControl?.value && addressNumberControl?.value;
  }

  get addressNumberInvalid() {
    const addressNameControl = this.registrationForm.get('addressName');
    const addressNumberControl = this.registrationForm.get('addressNumber');

    return (addressNameControl?.touched || addressNumberControl?.touched) && addressNameControl?.value && !addressNumberControl?.value;
  }
}
