import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleRestaurantComponent } from './components/single-restaurant/single-restaurant.component';
import { Page404Component } from './components/page404/page404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorComponent } from './components/author/author.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TokenValidateServiceService } from './services/token-validate-service.service';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { DeleteRestaurantModalComponent } from './components/delete-restaurant-modal/delete-restaurant-modal.component';
import { UpdateRestaurantComponent } from './components/update-restaurant/update-restaurant.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderModalComponent } from './components/order-modal/order-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantComponent,
    HeaderComponent,
    FooterComponent,
    SingleRestaurantComponent,
    Page404Component,
    AuthorComponent,
    OrderComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelComponent,
    ModalComponent,
    AddRestaurantComponent,
    DeleteRestaurantModalComponent,
    UpdateRestaurantComponent,
    MyOrdersComponent,
    OrderModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  providers: [
    TokenValidateServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
