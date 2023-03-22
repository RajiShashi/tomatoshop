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
  todayDate: any;
  fromdate: any;
  todate: any;

  constructor(private _salesService: SalesentryserviceService) { }

  
  ngOnInit(): void {
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear().toString();
    let todayDate = dd + '-' + mm + '-' + yyyy;
    this.todayDate = yyyy + '-' + mm + '-' + dd;;

    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    let dateval = 'fromdate='+todayDate+'&todate='+todayDate;
    this._salesService.getSalesDetail(dateval).subscribe(res => {
      this.salesData = res;
      
     })
  }

  showData() {
    
    let fromdate = this.fromdate.day.toString().padStart(2, '0')+'-'+this.fromdate.month.toString().padStart(2, '0')+'-'+this.fromdate.year.toString().substr(-2);
    let todate = this.todate.day.toString().padStart(2, '0')+'-'+this.todate.month.toString().padStart(2, '0')+'-'+this.todate.year.toString().substr(-2);
    let dateval = 'fromdate='+fromdate+'&todate='+todate;
    this._salesService.getSalesDetail(dateval).subscribe(res => {
      this.salesData = res;
      
     })
  }

}
