import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { DataTablesModule } from "angular-datatables";



@NgModule({
  declarations: [
    CustomersComponent,
    AddcustomerComponent
   
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class CustomersModule { }
