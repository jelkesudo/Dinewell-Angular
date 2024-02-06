import { Component, OnInit } from '@angular/core';
import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { IPaginatedOrder } from 'src/app/interfaces/iorder';
import { OrderService } from 'src/app/services/order.service';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  constructor(private modalService: NgbModal, private tokenService:TokenValidateServiceService, private service:OrderService){}
  orders!: IPaginatedOrder;
  pageNumbers: number[] = [];
  ngOnInit(): void {
    this.tokenService.redirectToLoginIfTokenExpired();
    this.printOrders();
  }
  printOrders(pages:string = "1"){
    this.service.getMyOrders(pages).subscribe((result)=>{
      this.orders = result;
      console.log(this.orders);
      this.pageNumbers = [];
      for (let i = 0; i < this.orders.pagesCount; i++) {
        this.pageNumbers.push(i + 1);
      }
    });
  }
  onPageChange(pageNumber: number){
    this.printOrders(`${pageNumber}`);
  }
  openModal(order: any) {
    const modalRef = this.modalService.open(OrderModalComponent);
    modalRef.componentInstance.modalData = {
      order: order
    };
  }
}

