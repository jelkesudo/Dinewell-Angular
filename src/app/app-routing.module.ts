import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { SingleRestaurantComponent } from './components/single-restaurant/single-restaurant.component';
import { Page404Component } from './components/page404/page404.component';
import { AuthorComponent } from './components/author/author.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './components/update-restaurant/update-restaurant.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "home", 
    component: HomeComponent
  },
  {
    path: "restaurant", 
    component: RestaurantComponent
  },
  {
    path: "single-restaurant/:id",
    component: SingleRestaurantComponent
  },
  {
    path: "page404",
    component: Page404Component
  },
  {
    path: "author",
    component: AuthorComponent
  },
  {
    path: "order",
    component: OrderComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "adminpanel",
    component: AdminPanelComponent
  },
  {
    path: "addrestaurant",
    component: AddRestaurantComponent
  },
  {
    path: "updaterestaurant/:id",
    component: UpdateRestaurantComponent
  },
  {
    path: "myorders",
    component: MyOrdersComponent
  },
  {
    path: "**",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
