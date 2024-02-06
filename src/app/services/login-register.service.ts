import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IFoodCategory, IRestaurant, IFood, ISide } from 'src/app/interfaces/irestaurant';
import { paths } from 'src/config/paths';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})

export class LoginRegisterService {

  constructor(private http:HttpClient, private router:Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${paths.apiPath}/auth`, { email, password });
  }

  register(userData: object): Observable<number> {
    let formValues: any = {
      firstName: (userData as any).value.firstName,
      lastName: (userData as any).value.lastName,
      email: (userData as any).value.email,
      password: (userData as any).value.password,
      username: (userData as any).value.username,
    };
    
    if ((userData as any).addressName) {
      formValues.addressName = (userData as any).value.addressName;
    }
    
    if ((userData as any).addressNumber) {
      formValues.addressNumber = (userData as any).value.addressNumber;
    }

    return this.http.post<any>(`${paths.apiPath}/register`, formValues, { observe: 'response' })
    .pipe(
      map((response: HttpResponse<any>) => {
        return response.status;
      }),
      catchError((error: any) => {
        console.error('Error occurred while registering user:', error);
        return throwError('Registration failed');
      })
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}
