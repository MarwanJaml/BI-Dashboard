import { Component, OnInit } from '@angular/core';
import { BarChartComponent } from '../../charts/bar-chart/bar-chart';
import { PieChartComponent } from '../../charts/pie-chart/pie-chart';
import { LineChartComponent } from '../../charts/line-chart/line-chart';
import { SalesDataService } from '../../services/sales-data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-sales',
  standalone: true,
  imports: [
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    CommonModule,

  ],
  templateUrl: './section-sales.html',
  styleUrl: './section-sales.css',
})
export class SectionSalesComponent implements OnInit {
  salesDataByCustomer: any;
  salesDataByState: any;

  constructor(
    private _salesDataService: SalesDataService,
    private router: Router
  ) { }

  navigateToBarChartDetail() {
    this.router.navigate(['/bar-chart']);
  }

  navigateToPieChartDetail() {
    this.router.navigate(['/pie-chart'], {
      state: {
        inputData: this.salesDataByCustomer,
        limit: 5
      }
    });
  }

  navigateToLineChartDetail() {
    this.router.navigate(['/line-chart']);
  }

  ngOnInit(): void {
    this._salesDataService.getOrdersByCustomer(5).subscribe((res) => {
      this.salesDataByCustomer = res;
      //console.log('Orders by Customer:', res);
    });

    this._salesDataService.getOrdersByState().subscribe((res) => {
      this.salesDataByState = res;
      console.log('Orders by State:', res);
    });
  }
}
