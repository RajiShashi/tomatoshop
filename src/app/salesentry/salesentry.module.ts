import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SalesentryRoutingModule } from './salesentry-routing.module';
import { SalesentryComponent } from './salesentry/salesentry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PackmodelComponent } from './packmodel/packmodel.component';
import { ReportComponent } from './report/report.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { PurchasereportComponent } from './purchasereport/purchasereport.component';
import { TallystatementComponent } from './tallystatement/tallystatement.component';


@NgModule({
  declarations: [
    SalesentryComponent,
    PackmodelComponent,
    ReportComponent,
    SalesreportComponent,
    PurchasereportComponent,
    TallystatementComponent
  ],
  entryComponents: [
    PackmodelComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SalesentryRoutingModule,
    NgbModule,
    AutocompleteLibModule
  ]
})
export class SalesentryModule { }
