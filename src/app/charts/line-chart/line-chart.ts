import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import { SalesDataService } from '../../services/sales-data.service';
import moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './line-chart.html',
  styleUrls: ['./line-chart.css'],
})
export class LineChartComponent implements OnInit {
  @Input() isDetailedView: boolean = false;

  constructor(private _salesDataService: SalesDataService,
    private router: Router,
    private location: Location) {
    // Detect if we're in detailed view based on route
    this.isDetailedView = this.router.url.includes('detailed') || this.router.url.includes('pie-chart');
  }


  topCustomers: string[] = [];
  allOrders: any[] = [];

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Sales Amount'
        },
        beginAtZero: true
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 4,
        hoverRadius: 6
      }
    }
  };

  lineChartLegend: boolean = true;
  lineChartType: 'line' = 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit() {
    this._salesDataService.getOrders(1, 100).subscribe((res: any) => {
      this.allOrders = res.data;
      console.log('All orders:', this.allOrders);

      this._salesDataService.getOrdersByCustomer(3).subscribe((cus: any) => {
        this.topCustomers = cus.map((x: any) => x['name']);
        console.log('Top customers:', this.topCustomers);

        const allChartData = this.topCustomers.reduce((result, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, [] as any[]);

        let dates = allChartData.map(x => x['data']).reduce((a, i) => {
          a.push(i.map((o: any) => new Date(o[0])));
          return a;
        }, [] as any[]);

        dates = [].concat.apply([], dates);
        console.log('dates:', dates);

        const result = this.getCustomerOrdersByDate(allChartData, dates);
        console.log('result:', result);

        if (result && result.data) {
          const r = result.data;
          console.log('r:', r);

          this.lineChartLabels = r[0]['orders'].map((o: any) => o['date']);

          this.lineChartData = [
            { 'data': r[0].orders.map((x: any) => x.total), 'label': r[0]['customer'], ...LINE_CHART_COLORS[0] },
            { 'data': r[1].orders.map((x: any) => x.total), 'label': r[1]['customer'], ...LINE_CHART_COLORS[3] },
            { 'data': r[2].orders.map((x: any) => x.total), 'label': r[2]['customer'], ...LINE_CHART_COLORS[2] }
          ];
        }
      });
    });
  }

  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter((o: any) => o.customer.name === name);
    console.log('name:', name, 'customerOrders:', customerOrders);

    const formattedOrders = customerOrders.reduce((r: any, e: any) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);

    console.log('formattedOrders:', formattedOrders);
    const result = { customer: name, data: formattedOrders };

    console.log('result:', result);
    return result;
  }

  getCustomerOrdersByDate(orders: any, dates: any) {
    // for each customer -> for each date =>
    // { data: [{'customer': 'XYZ', 'orders': [{ 'date': '17-11-25', total: 2421}, {}]}, {}, {}]}
    const customers = this.topCustomers;
    const prettyDates = dates.map((x: any) => this.toFriendlyDate(x));
    const u = Array.from(new Set(prettyDates)).sort();
    console.log('Unique sorted dates:', u);

    // define our result object to return:
    const result: any = {};
    const dataSets: any[] = result.data = [];

    customers.reduce((x, y, i) => {
      console.log('Processing customer:', y, 'at index:', i);
      const customerOrders: any[] = [];
      dataSets[i] = {
        customer: y, orders:
          u.reduce((r, e, j) => {
            const obj: any = {};
            obj['date'] = e;
            obj['total'] = this.getCustomerDateTotal(e, y); // sum total orders for this customer on this day
            customerOrders.push(obj);
            console.log('Date:', e, 'Customer:', y, 'Total:', obj['total']);
            return customerOrders;
          }, [] as any[])
      };
      return x;
    }, []);

    return result;
  }

  toFriendlyDate(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  getCustomerDateTotal(date: any, customer: string) {
    const r = this.allOrders.filter(o => {
      const orderDate = moment(o.placed).format('YYYY-MM-DD');
      const match = o.customer.name === customer && orderDate === date;
      if (match) {
        console.log('Match found:', o.customer.name, orderDate, o.total);
      }
      return match;
    });

    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return result;
  }

  goBack() {
    this.location.back();
  }

  onChartClick() {
    if (!this.isDetailedView) {
      this.router.navigate(['/line-chart']); // or your detailed route
    }
  }
}



// Mock Data

// public lineChartData: ChartConfiguration['data'] = {
//   labels: LINE_CHART_LABELS,
//   datasets: LINE_CHART_SAMPLE_DATA,

// };
//   lineChartColors =  LINE_CHART_COLORS;

// public lineChartOptions: ChartConfiguration['options'] = {
//   responsive: true,
//   scales: {
//     x: {
//       display: true,
//       title: {
//         display: true,
//         text: 'Months'
//       }
//     },
//     y: {
//       display: true,
//       title: {
//         display: true,
//         text: 'Values'
//       },
//       beginAtZero: true
//     }
//   },
//   plugins: {
//     legend: {
//       display: true,
//       position: 'top',
//     }
//   }
// };

// public lineChartType: ChartType = 'line';
