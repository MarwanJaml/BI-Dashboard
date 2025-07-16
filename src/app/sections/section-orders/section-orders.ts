import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/order';
import { CommonModule, DatePipe } from '@angular/common';
import { PaginationComponent } from "../../pagination/pagination";
import { SalesDataService } from '../../services/sales-data.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface OrdersApiResponse {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  data: Order[];
}

@Component({
  selector: 'app-section-orders',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './section-orders.html',
  styleUrl: './section-orders.css'
})
export class SectionOrdersComponent implements OnInit {
  constructor(private _salesData: SalesDataService) { }

  orders: Order[] = [];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    console.log('Getting orders for page:', this.page);
    this.loading = true;
    
    this._salesData.getOrders(this.page, this.limit)
      .pipe(
        catchError(error => {
          console.error('Error fetching orders:', error);
          this.loading = false;
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          console.log('Result from getOrders: ', res);
          const typedRes = res as OrdersApiResponse;
          this.orders = typedRes.data;
          this.total = typedRes.totalCount;
          console.log('Updated: page=', this.page, 'total=', this.total);
        }
        this.loading = false;
      });
  }

  // Handle pagination events
  onPreviousPage(): void {
    console.log('Previous page event triggered');
    if (this.page > 1) {
      this.page--;
      this.getOrders();
    }
  }

  onNextPage(): void {
    console.log('Next page event triggered');
    const totalPages = Math.ceil(this.total / this.limit);
    if (this.page < totalPages) {
      this.page++;
      this.getOrders();
    }
  }

  onGoToPage(pageNumber: number): void {
    console.log('Go to page event triggered with page:', pageNumber);
    const totalPages = Math.ceil(this.total / this.limit);
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== this.page) {
      this.page = pageNumber;
      this.getOrders();
    }
  }

  // Legacy methods for backward compatibility (you can remove these)
  goToPrevious() {
    this.onPreviousPage();
  }

  goToNext() {
    this.onNextPage();
  }

  goToPage(n: number): void {
    this.onGoToPage(n);
  }
}