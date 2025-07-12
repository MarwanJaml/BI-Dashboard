import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar";
import { SidebarComponent } from "./sidebar/sidebar";
import { SectionSalesComponent } from './sections/section-sales/section-sales';
import { SectionHealthComponent } from './sections/section-health/section-health';
import { SectionOrdersComponent } from './sections/section-orders/section-orders';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent,RouterModule,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected title = 'bi-dashboard-ui';
}
