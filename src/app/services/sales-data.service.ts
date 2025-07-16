import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define the interface for the API response
interface OrdersApiResponse {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  data: any[]; // Replace 'any' with your Order type if available
}

@Injectable({
  providedIn: 'root', 
})
export class SalesDataService {

  constructor(private _http: HttpClient) { }

  getOrders(pageIndex: number, pageSize: number): Observable<OrdersApiResponse> {
    return this._http.get<OrdersApiResponse>('https://localhost:7049/api/Order/' + pageIndex + '/' + pageSize)
      .pipe(map(res => res));
  }

  getOrdersByCustomer(n: number) {
    return this._http.get('https://localhost:7049/api/Order/bycustomer/' + n)
      .pipe(map(res => res));
  }

  getOrdersByState() {
    return this._http.get('https://localhost:7049/api/order/bystate/')
      .pipe(map(res => res));
  }
}