import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent {
  @Input() modalData: any;
  totalPrice:number = 0;
  constructor(public activeModal: NgbActiveModal) {
    
  }

  ngOnInit() : void{
    for(let m of this.modalData.order.meals){
      this.totalPrice += parseFloat(m.price) * parseInt(m.quantity); 
    }
  }
  
  closeModal() {
    this.activeModal.close('Modal closed');
  }
}
