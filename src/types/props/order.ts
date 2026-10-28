import type {
  ICustomer,
  IOrder,
  IOrderHistoryEntry,
  IOrderItem,
  IOrderListItem,
  IOrderNote,
  OrderSort,
  OrderSortField,
  OrderStatus,
  TransitionsMap,
} from "@/types/models";
import type { ReactNode } from "react";

export interface IOrderDetailsProps {
  id: string;
}

export interface IOrderModalProps {
  children: ReactNode;
  fullPageHref: string;
}

export interface IStatusSelectProps {
  id: string;
  status: OrderStatus;
  transitions: TransitionsMap;
}

export interface IOrdersTableProps {
  orders: IOrderListItem[];
  transitions: TransitionsMap;
  sort: OrderSort;
  params: URLSearchParams;
}

export interface ISortHeaderProps {
  field: OrderSortField;
  label: string;
  sort: OrderSort;
  params: URLSearchParams;
}

export interface IPaginationProps {
  page: number;
  totalPages: number;
  params: URLSearchParams;
}

export interface IPageLinkProps {
  page: number;
  label: string;
  enabled: boolean;
  params: URLSearchParams;
}

export interface IOrderHeaderProps {
  order: IOrder;
  transitions: TransitionsMap;
}

export interface IOrderItemsProps {
  items: IOrderItem[];
  total: number;
  currency: string;
}

export interface IOrderNotesProps {
  orderId: string;
  notes: IOrderNote[];
}

export interface ICustomerCardProps {
  customer: ICustomer;
}

export interface IStatusHistoryProps {
  history: IOrderHistoryEntry[];
}
