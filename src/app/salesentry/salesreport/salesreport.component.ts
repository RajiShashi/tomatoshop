import { Component, OnInit } from '@angular/core';
import { SalesentryserviceService } from '../salesentryservice.service';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css']
})
export class SalesreportComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  salesData: any = [];
  
  constructor(private _salesService: SalesentryserviceService) { }

  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    
    this._salesService.getSalesDetail('').subscribe(res => {
      this.salesData = res;
      
     })
  }

}
