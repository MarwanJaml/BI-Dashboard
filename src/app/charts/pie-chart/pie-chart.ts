import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ThemeColors } from '../../shared/theme.colors.model';
import { THEME_COLORS } from '../../shared/theme.colors';
import { SalesDataService } from '../../services/sales-data.service';
import { Router } from '@angular/router';

const theme = 'Bright';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './pie-chart.html',
  styleUrls: ['./pie-chart.css'],
})
export class PieChartComponent implements OnInit {
  @Input() isDetailedView: boolean = false;
  @Input() inputData: any;
  @Input() limit: number = 5;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  public pieChartLabels: string[] = [];
  public backgroundColor: string[] = this.themeColors(theme);
  public pieChartType: ChartType = 'doughnut';

  public pieChartData: ChartData<'doughnut'> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [],
      backgroundColor: this.backgroundColor,
    }],
  };

  constructor(
    private _salesDataService: SalesDataService,
    private router: Router,
    private location: Location
  ) {
    this.isDetailedView = this.router.url.includes('detailed') || this.router.url.includes('pie-chart');
  }

  ngOnInit(): void {
    // Check for data in history state (works after navigation)
    const state = window.history.state;
    if (state?.inputData) {
      this.inputData = state.inputData;
      this.limit = state.limit || 5;
    }

    if (this.inputData) {
      this.parseChartData(this.inputData, this.limit);
    } else if (this.isDetailedView) {
      // Fallback: fetch data if in detailed view and no input
      this._salesDataService.getOrdersByCustomer(this.limit).subscribe(res => {
        this.inputData = res;
        this.parseChartData(res, this.limit);
      });
    }
  }

  parseChartData(res: any, limit: number) {
    if (!res) return;

    const allData = res.slice(0, limit);
    this.pieChartData = {
      labels: allData.map((item: any) => item.name || item.status),
      datasets: [{
        data: allData.map((item: any) => item.totalAmount),
        backgroundColor: this.backgroundColor
      }]
    };
  }

  themeColors(setName: string): string[] {
    const foundSet = THEME_COLORS.slice(0).find((set) => set.name === setName);
    return foundSet ? foundSet.colorSet : [];
  }

  goBack() {
    this.location.back();
  }

  onChartClick() {
    if (!this.isDetailedView) {
      this.router.navigate(['/pie-chart'], {
        state: {
          inputData: this.inputData,
          limit: this.limit
        }
      });
    }
  }
}

//Mock Data

// public pieChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//     },
//   };

//   public pieChartLabels: string[] = [
//     'Download Sales',
//     'In-Store Sales',
//     'Mail Sales',
//   ];
//   public pieChartType: ChartType = 'doughnut';

//   public pieChartData: ChartConfiguration['data'] = {
//     labels: this.pieChartLabels,
//     datasets: [
//       {
//         data: [300, 500, 100],
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         borderColor: '#111',
//         borderWidth: 1,
//       },
//     ],
//   };
