import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';
import { IFoodCategory } from 'src/app/interfaces/irestaurant';
import { IPaginatedRestaurantAdmin } from 'src/app/interfaces/iadminrestaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteRestaurantModalComponent } from '../delete-restaurant-modal/delete-restaurant-modal.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent {
  constructor(private modalService: NgbModal, private service:RestaurantService, private tokenService: TokenValidateServiceService){}
  restaurants!: IPaginatedRestaurantAdmin;
  ngOnInit(): void {
    this.tokenService.redirectToLoginIfTokenExpired();
    this.tokenService.redirectToHomeIfNotAdmin();
    this.printMenu();
  }
  printMenu():void{
    this.service.getRestaurantsAdmin("1", "").subscribe((result)=>{
      this.restaurants = result;
    });
  }


  openModalDelete(restaurant: any) {
    const modalRef = this.modalService.open(DeleteRestaurantModalComponent);
    modalRef.componentInstance.modalData = {
      id: restaurant.id,
    };
    modalRef.result.then(
      (result) => {
        console.log(`Modal closed with result: ${result}`);
      },
      (reason) => {
        console.log(`Modal dismissed with reason: ${reason}`);
      }
    );
  }

  deleteRestaurant(restaurantId: number): void {
    // this.service.deleteRestaurant(restaurantId).subscribe(() => {
    //   const index = this.restaurants.data.findIndex(
    //     (restaurant) => restaurant.id === restaurantId
    //   );
    //   if (index !== -1) {
    //     this.restaurants.data.splice(index, 1);
    //   }
    // });
  }
}
