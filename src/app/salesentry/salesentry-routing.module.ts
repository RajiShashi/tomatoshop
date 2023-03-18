import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasereportComponent } from './purchasereport/purchasereport.component';
import { ReportComponent } from './report/report.component';
import { SalesentryComponent } from './salesentry/salesentry.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { TallystatementComponent } from './tallystatement/tallystatement.component';
import { SalesmanreportComponent } from './salesmanreport/salesmanreport.component';

const routes: Routes = [
  { path: 'sales', component: SalesentryComponent },
  { path: "sales/:route", component: SalesentryComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'salesreport', component: SalesreportComponent },
  { path: 'salesmanreport/:id', component: SalesmanreportComponent },
  { path: 'purchasereport', component: PurchasereportComponent },
  { path: 'tallystatement', component: TallystatementComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesentryRoutingModule { }
