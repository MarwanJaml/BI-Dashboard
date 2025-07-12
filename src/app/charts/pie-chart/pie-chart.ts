import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.html',
  styleUrls: ['./pie-chart.css']
})
export class PieChartComponent {
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,  // Add this line
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartType: ChartType = 'doughnut';
  
  public pieChartData: ChartConfiguration['data'] = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [300, 500, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      borderColor: '#111',
      borderWidth: 1
    }]
  };
}