import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/order';
import { CommonModule, DatePipe } from '@angular/common';
import { PaginationComponent } from "../../pagination/pagination";
import { SalesDataService } from '../../services/sales-data.service';

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
  this._salesData.getOrders(this.page, this.limit)
    .subscribe(res => {
      console.log('Result from getOrders: ', res);
      this.orders = (res as any).page.data;
      this.total = (res as any).page.total;
      this.loading = false;
    });
}

  goToPrevious() {
    //console.log('Go To Previous clicked');
    this.page--;
    this.getOrders();
  }

   goToNext() {
    //console.log('Go To Next clicked');
    this.page++;
    this.getOrders();
  }

}
