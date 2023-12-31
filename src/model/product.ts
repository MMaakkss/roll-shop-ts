export interface IProduct {
  id: number;
  img: string;
  title: string;
  amount: number;
  weight: number;
  price: number;
}

export interface IBasketProduct extends IProduct {
  count: number;
}
