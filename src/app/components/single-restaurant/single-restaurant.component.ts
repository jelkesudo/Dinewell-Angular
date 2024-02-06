import { Component, OnInit } from '@angular/core';
import { IRestaurant, IFoodCategory, IFood } from 'src/app/interfaces/irestaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-single-restaurant',
  templateUrl: './single-restaurant.component.html',
  styleUrls: ['./single-restaurant.component.css']
})
export class SingleRestaurantComponent implements OnInit {
  constructor(private modalService: NgbModal, private service:RestaurantService, private activated:ActivatedRoute, private tokenService:TokenValidateServiceService){}

  restaurant!: IRestaurant;
  foodCategories!: IFoodCategory[];
  foods!: IFood[];
  retaurantId!: number;
  food!: IFood;

  ngOnInit(): void {
    this.tokenService.redirectToLoginIfTokenExpired();
    this.retaurantId = Number(this.activated.snapshot.paramMap.get('id'));
    this.getRestaurantInfo();
  }
  getRestaurantInfo():void{
    this.service.getSingleRestaurants(this.retaurantId).subscribe(
        (restaurant) => {
          this.restaurant = restaurant;
        },
        (error) => {
          console.error('Error loading restaurant details:', error);
        }
    );
  }

  openModal(food: any) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalData = {
      name: food.name,
      description: food.description,
      price: food.price,
      id: food.id
    };
  }

  getFoodNameById(foodId: number): string {
    const matchedFood = this.foods.find(food => food.id === foodId);
    return matchedFood ? matchedFood.name : '';
  }
  getFoodCategoryNameById(foodCategoryId: number): string {
    const matchedFood = this.foodCategories.find(food => food.id === foodCategoryId);
    return matchedFood ? matchedFood.name : '';
  }
}
