import type { OrderStatus } from "./order";

export interface IRevenueByDay {
  date: string;
  revenue: number;
  orders: number;
}

export interface ITopProduct {
  productId: string;
  name: string;
  sold: number;
}

export interface IStats {
  revenue: number;
  currency: string;
  ordersCount: number;
  avgOrderValue: number;
  byStatus: Record<OrderStatus, number>;
  revenueByDay: IRevenueByDay[];
  topProducts: ITopProduct[];
  generatedAt: string;
}
