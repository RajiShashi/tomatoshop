import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasereportComponent } from './purchasereport/purchasereport.component';
import { ReportComponent } from './report/report.component';
import { SalesentryComponent } from './salesentry/salesentry.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { TallystatementComponent } from './tallystatement/tallystatement.component';
import { SalesmanreportComponent } from './salesmanreport/salesmanreport.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { CustomerreportComponent } from './customerreport/customerreport.component';
import { CustomerbillreportComponent } from './customerbillreport/customerbillreport.component';

const routes: Routes = [
  { path: 'sales', component: SalesentryComponent },
  { path: "sales/:route", component: SalesentryComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'salesreport', component: SalesreportComponent },
  { path: 'salesmanreport/:id', component: SalesmanreportComponent },
  { path: 'purchasereport', component: PurchasereportComponent },
  { path: 'tallystatement', component: TallystatementComponent },
  { path: 'receipts', component: ReceiptComponent },
  { path: 'customerreport', component: CustomerreportComponent },
  { path: 'customerbillreport/:id', component: CustomerbillreportComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesentryRoutingModule { }
