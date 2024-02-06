import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from 'src/app/services/login-register.service';
import { Router } from '@angular/router';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    localStorage.removeItem("order");
    this.tokenService.redirectBasedOnToken();
  }
  email!: string;
  password!: string;
  loginError!: string;

  constructor(private loginService: LoginRegisterService, private router:Router, private tokenService:TokenValidateServiceService) { }

  onSubmit() {
    let that = this;
    this.loginError = "";
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem("token", token);
        this.loginError = "Successful logging, please wait.";
        that.tokenService.redirectBasedOnToken();
      },
      (error) => {
        console.log(error);
        this.loginError = "Invalid credidentials.";
      }
    );
  }
}
