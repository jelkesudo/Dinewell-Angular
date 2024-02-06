import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IFoodCategory, IRestaurant, IFood, ISide, IPaginatedRestaurant } from 'src/app/interfaces/irestaurant';
import { paths } from 'src/config/paths';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private http:HttpClient, private router:Router) { }
  
  getRestaurants(page:string = "1", keyword:string = ""): Observable<any> {
    const token = localStorage.getItem("token");
    let addressSend = `${paths.apiPath}/restaurant?page=${page}`;
    if(keyword && keyword != ""){
      addressSend = `${paths.apiPath}/restaurant?page=${page}&name=${keyword}`;
    }
    return this.http.get<any>(addressSend, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});
  }

  getRestaurantsAdmin(page:string = "1", keyword:string = ""): Observable<any> {
    const token = localStorage.getItem("token");
    let addressSend = `${paths.apiPath}/restaurant/admin?page=${page}`;
    if(keyword && keyword != ""){
      addressSend = `${paths.apiPath}/restaurant?page=${page}&name=${keyword}`;
    }
    return this.http.get<any>(addressSend, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});
  }

  getSingleRestaurants(restaurantId: number): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get<any>(`${paths.apiPath}/restaurant/${restaurantId}`, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});
  }

  getSingleRestaurantAdmin(restaurantId: number): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get<any>(`${paths.apiPath}/restaurant/admin/${restaurantId}`, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});
  }

  deleteRestaurant(id:number){
    const token = localStorage.getItem("token");
    return this.http.delete<any>(`${paths.apiPath}/restaurant/admin/${id}`, { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), observe: 'response' })
    .pipe(
      map((response: HttpResponse<any>) => {
        return response.status;
      }),
      catchError((error: any) => {
        console.error('Error occurred while deleting restaurant:', error);
        return throwError('Adding restaurant failed');
      })
    );
  }

  addRestaurant(restaurantData: object, option:number = 0): Observable<number>{
    let formValues: any = {
      name: (restaurantData as any).value.name,
      description: (restaurantData as any).value.description,
      address: (restaurantData as any).value.address,
      addressNumber: parseInt((restaurantData as any).value.addressNumber),
      workFrom: (restaurantData as any).value.workFrom,
      workTo: (restaurantData as any).value.workTo,
    };
    const token = localStorage.getItem("token");
    if(option == 0){
      return this.http.post<any>(`${paths.apiPath}/restaurant/admin`, formValues, { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.status;
        }),
        catchError((error: any) => {
          console.error('Error occurred while adding restaurant:', error);
          return throwError('Adding restaurant failed');
        })
      );
    }
    else{
      return this.http.put<any>(`${paths.apiPath}/restaurant/admin/${option}`, formValues, { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.status;
        }),
        catchError((error: any) => {
          console.error('Error occurred while adding restaurant:', error);
          return throwError('Adding restaurant failed');
        })
      );
    }
    
  }

  // getFoodCategories():Observable<IFoodCategory[]>{
  //   return this.http.get<IFoodCategory[]>(paths.jsonPath + "foodcategory.json");
  // }

  // getFoods():Observable<IFood[]>{
  //   return this.http.get<IFood[]>(paths.jsonPath + "food.json");
  // }

  // getSides():Observable<ISide[]>{
  //   return this.http.get<ISide[]>(paths.jsonPath + "side.json");
  // }

  // getRestaurantById(restaurantId: number):Observable<IRestaurant>{
  //   return this.http.get<IRestaurant[]>(paths.jsonPath+"restaurant.json").pipe(
  //     map((restaurants: IRestaurant[]) => {
  //       const restaurant = restaurants.find((r: IRestaurant) => r.id === restaurantId);
  //       if (restaurant) {
  //         return restaurant;
  //       } else {
  //         this.router.navigate(['/page404']);
  //         throw new Error(`Movie with ID ${restaurantId} not found.`);
  //       }
  //     })
  //   );
  // }

  // getFoodById(foodId: number):Observable<IFood>{
  //   return this.http.get<IFood[]>(paths.jsonPath+"food.json").pipe(
  //     map((foods: IFood[]) => {
  //       const food = foods.find((r: IFood) => r.id === foodId);
  //       if (food) {
  //         return food;
  //       } else {
  //         this.router.navigate(['/page404']);
  //         throw new Error(`Movie with ID ${foodId} not found.`);
  //       }
  //     })
  //   );
  // }
}
