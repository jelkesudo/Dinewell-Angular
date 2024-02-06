import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() modalData: any;
  quantity:string = "1";

  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close('Modal closed');
  }

  putInOrder(){
    let order = localStorage.getItem("order");
    if(order != null){
      let parsedOrder = JSON.parse(order);
      let filteredOrder = parsedOrder!.filter((x: any) => x.id === this.modalData.id);
      console.log(filteredOrder);
      if(filteredOrder.length != 0){
        for(let f of parsedOrder){
          if(f.id === this.modalData.id){
            f.quantity += parseInt(this.quantity);
          }
        }
        localStorage.setItem("order", JSON.stringify(parsedOrder));
      }
      else{
        parsedOrder.push({id: this.modalData.id, name: this.modalData.name, quantity: parseInt(this.quantity), price: this.modalData.price});
        localStorage.setItem("order", JSON.stringify(parsedOrder));
      }
    }
    else{
      let orderArray = [];
      orderArray.push({id: this.modalData.id, name: this.modalData.name, quantity: parseInt(this.quantity), price: this.modalData.price});
      localStorage.setItem("order", JSON.stringify(orderArray));
    }
  }
}
