import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { SalesentryComponent } from './salesentry/salesentry.component';

const routes: Routes = [
  { path: 'sales', component: SalesentryComponent },
  { path: 'reports', component: ReportComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesentryRoutingModule { }
