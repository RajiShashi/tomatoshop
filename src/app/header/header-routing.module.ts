import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesentryComponent } from '../salesentry/salesentry/salesentry.component';


const routes: Routes = [
   { path: 'sales', component: SalesentryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
