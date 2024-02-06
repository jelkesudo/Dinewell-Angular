import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { IFoodCategory, IRestaurant, IFood, ISide } from 'src/app/interfaces/irestaurant';
import { paths } from 'src/config/paths';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient, private router:Router) { }

  sendOrder(orderData: any): Observable<boolean> {
    let token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${paths.apiPath}/order`, orderData, { headers })
      .pipe(
        map((response: any) => {
          return true;
        }),
        catchError((error) => {
          return of(false);
        })
      );
  }
  getMyOrders(page:string = "1"): Observable<any> {
    const token = localStorage.getItem("token");
    let addressSend = `${paths.apiPath}/user/myorders?page=${page}`;
    return this.http.get<any>(addressSend, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});
  }
}
