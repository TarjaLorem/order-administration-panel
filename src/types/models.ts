export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export interface ICustomer {
  id: string;
  name: string;
  email: string;
}

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
}

export interface IOrderHistoryEntry {
  status: OrderStatus;
  at: string;
}

export interface IOrderNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface IOrder {
  id: number
  customer: ICustomer;
  items: IOrderItem[];
  total: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string; // ISO
  history: IOrderHistoryEntry[];
  notes: IOrderNote[];
}

export interface IProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
}
