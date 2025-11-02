export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    display: string;
    gpu: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  email: string;
}
