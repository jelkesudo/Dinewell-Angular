import { Component, OnInit } from '@angular/core';
import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { IRestaurant } from 'src/app/interfaces/irestaurant';
import { OrderService } from 'src/app/services/order.service';
import { TokenValidateServiceService } from 'src/app/services/token-validate-service.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  constructor(private tokenService:TokenValidateServiceService, private service:OrderService){}
  restaurants!: IRestaurant[];
  userAddress!: string;
  orderArray: { name: string, id: number, quantity: number, price:number}[] = [];
  message : string = "You have not ordered anything, go order something.";
  errorMessage: string = "";
  total: number = 0;
  ngOnInit(): void {
    this.tokenService.redirectToLoginIfTokenExpired();
    this.message = "You have not ordered anything, go order something.";
    let token = localStorage.getItem("token");
    if(token == null) return;
    let parts = token.split('.');
    let payload = JSON.parse(atob(parts[1]));
    this.userAddress = payload.Address;
    this.printOrders();
  }
  sendOrder(){
    let addressPattern = /^[\w\s.,#-]+$/;
    if(this.userAddress == "" || this.userAddress.length == 0 || !addressPattern.test(this.userAddress)){
      this.errorMessage = "You must include an address and it needs a name and a number";
      return;
    }
    else{
      this.errorMessage = "";
      let orderArrayGet = localStorage.getItem("order");
      if(orderArrayGet != null){
        let orderArrayParse = JSON.parse(orderArrayGet);
        let mealsSend:{mealId: number, quantity: number, sides:[]}[] = [];
        for(let order of orderArrayParse){
          mealsSend.push({mealId: order.id, quantity: parseInt(order.quantity), sides:[]});
        }
        let objSend = {
          userAddress: this.userAddress,
          meals: mealsSend
        };
        console.log(objSend);
        let isSent = this.service.sendOrder(objSend).subscribe((result) => {
          if (result) {
            this.errorMessage = "Succesfully ordered your food.";
            var that = this;
            localStorage.removeItem("order");
            this.printOrders();
            this.message = "Your order is on the way!";
            setTimeout(function(){
              that.errorMessage = "";
            }, 2000);
          } else {
            this.errorMessage = "There was an error sending your request.";
          }
        });
      }
    }
    
  }
  printOrders(){
    let orderArray = localStorage.getItem("order");
    if(orderArray != null){
      this.orderArray = JSON.parse(orderArray);
      for(let order of this.orderArray){
        this.total += order.price * order.quantity;
      }
    }
    else{
      this.orderArray = [];
      this.total += 0;
    }
  }
}
