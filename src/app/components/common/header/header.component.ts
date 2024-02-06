import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INav } from 'src/app/interfaces/inav';
import { paths } from 'src/config/paths';
import { LoginRegisterService } from 'src/app/services/login-register.service';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private tokenService:TokenValidateServiceService, private http:HttpClient, private loginService:LoginRegisterService){}
  nav!: INav[];
  ngOnInit(): void {

  }
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
  
      if (tokenData.exp) {
        const expirationTime = tokenData.exp * 1000;
        const currentTime = new Date().getTime();
  
        return currentTime >= expirationTime;
      }
    }
  
    return true;
  }

  amIUser(){
    return this.tokenService.amI("User");
  }

  amIAdmin(){
    return this.tokenService.amI();
  }

  logoutUser(){
    this.loginService.logout();
  }
}
