import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-restaurant-modal',
  templateUrl: './delete-restaurant-modal.component.html',
  styleUrls: ['./delete-restaurant-modal.component.css']
})
export class DeleteRestaurantModalComponent {
  @Input() modalData: any;

  constructor(private router:Router, public service: RestaurantService, public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close('Modal closed');
  }

  deleteRestaurant(id:number){
    this.service.deleteRestaurant(id).subscribe(
      (statusCode: number) => {
        console.log(statusCode);
        if (statusCode === 204) {
          this.closeModal();
          this.router.navigate(['/adminpage']);
        } else {
          alert("Failed to delete restaurant.");
        }
      },
      (error: any) => {
        alert("Error occured.");
      }
    );
  }
}
