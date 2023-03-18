import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasereportComponent } from './purchasereport/purchasereport.component';
import { ReportComponent } from './report/report.component';
import { SalesentryComponent } from './salesentry/salesentry.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { TallystatementComponent } from './tallystatement/tallystatement.component';

const routes: Routes = [
  { path: 'sales', component: SalesentryComponent },
  { path: "sales/:route", component: SalesentryComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'salesreport', component: SalesreportComponent },
  { path: 'purchasereport', component: PurchasereportComponent },
  { path: 'tallystatement', component: TallystatementComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesentryRoutingModule { }
