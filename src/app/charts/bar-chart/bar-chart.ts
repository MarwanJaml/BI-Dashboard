import { Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { SalesDataService } from '../../services/sales-data.service';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css'
})
export class BarChartComponent implements OnInit {
  @Input() isDetailedView: boolean = false;

  constructor(
    private _salesDataService: SalesDataService,
    private router: Router,
    private location: Location
  ) {
    this.isDetailedView = this.router.url.includes('detailed') || this.router.url.includes('bar-chart');
  }

  orders: any[] = [];
  ordersLabels: string[] = [];
  ordersData: any[] = [];

  public barChartData: any[] = [];
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
      onComplete: () => {
        // Animation complete callback
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  ngOnInit() {
    this._salesDataService.getOrders(0, 100)
      .subscribe(res => {
        const localChartData = this.getChartData(res);
        this.barChartData = [
          {
            data: localChartData.map((e: [string, number]) => e[1]),
            label: 'Orders',
            backgroundColor: 'rgba(135, 53, 53, 0.7)',
            borderColor: 'rgba(225, 5, 5, 1)',
            borderWidth: 1
          }
        ];
        this.barChartLabels = localChartData.map((e: [string, number]) => e[0]);
      });
  }

  getChartData(res: any) {
    this.orders = res.data;
    const formattedOrders = this.orders.reduce((r, e) => {
      r.push([moment(e.placed).format('YY-MM-DD'), e.total]);
      return r;
    }, []);

    const p: { [key: string]: [string, number] } = {};

    return formattedOrders.reduce((r: [string, number][], e: [string, number]) => {
      const key = e[0];
      if (!p[key]) {
        p[key] = e;
        r.push(p[key]);
      } else {
        p[key][1] += e[1];
      }
      return r;
    }, []);
  }

  goBack() {
    this.location.back();
  }

  onChartClick() {
    if (!this.isDetailedView) {
      this.router.navigate(['/bar-chart']);
    }
  }
}