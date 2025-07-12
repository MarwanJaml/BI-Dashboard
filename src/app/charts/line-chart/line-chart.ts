import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis' },
  { data: [12, 18, 26, 13, 28, 26], label: 'Image Recognition' },
  { data: [52, 34, 49, 53, 68, 62], label: 'Forecasting' },
];

const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective,CommonModule],
  templateUrl: './line-chart.html',
  styleUrls: ['./line-chart.css']
})
export class LineChartComponent {
  public lineChartData: ChartConfiguration['data'] = {
    labels: LINE_CHART_LABELS,
    datasets: LINE_CHART_SAMPLE_DATA
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Values'
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };

  public lineChartType: ChartType = 'line';
}