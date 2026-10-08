export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export const ORDER_STATUSES: OrderStatus[] = ["pending", "paid", "shipped", "delivered", "cancelled"];

export type TransitionsMap = Record<OrderStatus, OrderStatus[]>;

export type OrderSortField = "createdAt" | "total" | "updatedAt";
export type OrderSort = OrderSortField | `-${OrderSortField}`;

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
  id: number;
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

export interface IOrderListItem {
  id: string;
  customer: ICustomer;
  total: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  itemsCount: number;
}

export interface IOrdersQuery {
  status: OrderStatus[];
  q: string;
  sort: OrderSort;
  page: number;
  limit: number;
}

export interface IStatusSelectProps {
  id: string;
  status: OrderStatus;
  transitions: TransitionsMap;
}
