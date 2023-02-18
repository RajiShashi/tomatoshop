import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SalesentryRoutingModule } from './salesentry-routing.module';
import { SalesentryComponent } from './salesentry/salesentry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PackmodelComponent } from './packmodel/packmodel.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    SalesentryComponent,
    PackmodelComponent,
    ReportComponent
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
  ]
})
export class SalesentryModule { }
