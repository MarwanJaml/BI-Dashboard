import { Routes } from '@angular/router';
import { SectionSalesComponent } from './sections/section-sales/section-sales';
import { SectionOrdersComponent } from './sections/section-orders/section-orders';
import { SectionHealthComponent } from './sections/section-health/section-health';

export const routes: Routes = [

    {path: 'sales', component: SectionSalesComponent},
    {path: 'orders', component: SectionOrdersComponent},
    {path: 'health', component: SectionHealthComponent},

    {path: '', redirectTo: '/sales', pathMatch: 'full'},

];
