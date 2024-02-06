export interface IPaginatedRestaurantAdmin {
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
    pagesCount: number;
    data: IRestaurantAdmin[];
}

export interface IRestaurantAdmin {
    id:number,
    name: string,
    description: string,
    address: string,
    addressNumber: number,
    addressName: string,
    workingHours: string,
    workFrom: number,
    workTo: number,
    image: string,
    foodCategories: IFoodCategory[];
    updatedAt: string,
    deletedAt: string,
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