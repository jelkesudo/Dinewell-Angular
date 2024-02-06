import { Component, OnInit } from '@angular/core';
import { IFoodCategory, IPaginatedRestaurant } from 'src/app/interfaces/irestaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Router } from '@angular/router';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit{
  constructor(private service:RestaurantService, private Router:Router, private tokenService:TokenValidateServiceService){}
  restaurants!: IPaginatedRestaurant;
  inputValue: string = "";
  foodCategories! :IFoodCategory[];
  selectedCategories: number[] = [];
  pageNumbers: number[] = [];
  pageNumber: string = "1";

  selectedPage! :string;
  ngOnInit(): void {
    this.tokenService.redirectToLoginIfTokenExpired();
    this.printMenu();
  }
  printMenu():void{
    this.service.getRestaurants(this.pageNumber, this.inputValue).subscribe((result)=>{
      this.restaurants = result;
      this.pageNumbers = [];
      for (let i = 0; i < this.restaurants.pagesCount; i++) {
        this.pageNumbers.push(i + 1);
      }
      // if(this.selectedCategories.length !== 0){
      //   this.restaurants = this.restaurants.filter((restaurant) => {
      //     return restaurant.foodCategories.some((category) => this.selectedCategories.includes(category.id));
      //   });
      // }
  });
  }
  // getCategories():void{
  //   this.service.getFoodCategories().subscribe((result)=>{
  //     this.foodCategories = result;
  //   });
  // }
  onPageChange(pageNumber: number){
    this.pageNumber = `${pageNumber}`;
    this.printMenu();
  }
  toggleCategorySelection(categoryId: number) {
    let index = this.selectedCategories.indexOf(categoryId);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(categoryId);
    }
    this.printMenu();
  }
}
