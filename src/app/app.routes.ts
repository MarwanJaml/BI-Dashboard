import { Routes } from '@angular/router';
import { SectionSalesComponent } from './sections/section-sales/section-sales';
import { SectionOrdersComponent } from './sections/section-orders/section-orders';
import { SectionHealthComponent } from './sections/section-health/section-health';
import { BarChartComponent } from './charts/bar-chart/bar-chart';
import { PieChartComponent } from './charts/pie-chart/pie-chart';
import { LineChartComponent } from './charts/line-chart/line-chart';

export const routes: Routes = [

    { path: 'sales', component: SectionSalesComponent },
    { path: 'orders', component: SectionOrdersComponent },
    { path: 'health', component: SectionHealthComponent },
    { path: 'bar-chart', component: BarChartComponent },
    { path: 'pie-chart', component: PieChartComponent },
    { path: 'line-chart', component: LineChartComponent },

    { path: '', redirectTo: '/sales', pathMatch: 'full' },

];
