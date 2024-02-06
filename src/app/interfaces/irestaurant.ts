export interface IPaginatedRestaurant {
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
    pagesCount: number;
    data: IRestaurant[];
}

export interface IRestaurant {
    id:number,
    name: string,
    description: string,
    address: string,
    workingHours: string,
    image: string,
    foodCategories: IFoodCategory[];
}

export interface IFoodCategory {
    id: number;
    name: string;
    meals: IFood[];
}
  
export interface IFood {
    id: number;
    description: string;
    name: string;
    price: number;
    image: string;
}
  
export interface ISide {
    id: number;
    name: string;
    price: number;
}