import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenValidateServiceService {
  constructor(private router: Router) {}

  amI(val:string = "Admin"){
    const token = localStorage.getItem("token");
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        if (payload.Role == val) {
          return true;
        }
      }
    }
    return false;
  }

  redirectBasedOnToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTimeInSeconds) {
          this.router.navigate(['/login']);
          return;
        }
        const userRole = payload.Role;
        if (userRole === 'Admin') {
          this.router.navigate(['/adminpanel']);
        } else if (userRole === 'User') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  redirectToLoginIfTokenExpired() {
    const token = localStorage.getItem("token");
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTimeInSeconds) {
          this.router.navigate(['/login']);
          return;
        }
      }
    }
    else{
      this.router.navigate(['/login']);
      return;
    }
  }

  redirectToHomeIfTokenNotExpired(){
    const token = localStorage.getItem("token");

    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if (!payload.exp || payload.exp >= currentTimeInSeconds) {
          this.router.navigate(['/home']);
          return;
        }
      }
    }

    return;
  }

  redirectToHomeIfNotAdmin() {
    const token = localStorage.getItem("token");
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        if (payload.Role != "Admin") {
          this.router.navigate(['/home']);
          return;
        }
      }
    }
  }
}
