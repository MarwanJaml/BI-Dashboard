import { Component } from '@angular/core';
import { Order } from '../../shared/order';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-section-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-orders.html',
  styleUrl: './section-orders.css'
})
export class SectionOrdersComponent {
  orders: Order[] = [];

}
