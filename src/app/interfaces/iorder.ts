export interface IPaginatedOrder {
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
    pagesCount: number;
    data: IOrder[];
}

export interface IOrder {
    id: number;
    orderNumber: string;
    orderAddress: string;
    meals: IOrderMeals[];
}

export interface IOrderMeals {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}
  
  
  
  
  