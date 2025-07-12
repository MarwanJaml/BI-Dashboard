import { Component } from '@angular/core';
import { BarChartComponent } from '../../charts/bar-chart/bar-chart';
import { PieChartComponent } from '../../charts/pie-chart/pie-chart';
import { LineChartComponent } from '../../charts/line-chart/line-chart';

@Component({
  selector: 'app-section-sales',
  standalone: true,
  imports: [BarChartComponent, PieChartComponent, LineChartComponent],
  templateUrl: './section-sales.html',
  styleUrl: './section-sales.css'
})
export class SectionSalesComponent {
}