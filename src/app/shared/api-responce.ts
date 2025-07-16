import { Order } from './order';

export interface ApiResponse {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  data: Order[];
}