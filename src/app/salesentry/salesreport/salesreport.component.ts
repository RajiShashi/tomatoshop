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
  currentDate: any;


  constructor(private _salesService: SalesentryserviceService) { }

  
  ngOnInit(): void {
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear().toString();
    this.currentDate = dd + '-' + mm + '-' + yyyy.substr(-2);
    this.todayDate = yyyy + '-' + mm + '-' + dd;;

    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    let dateval = 'fromdate='+this.currentDate+'&todate='+this.currentDate;
    this._salesService.getSalesDetail(dateval).subscribe(res => {
      this.salesData = res;
      
     })
  }

  showData() {
    let todate, fromdate;
    if(this.fromdate) {
      fromdate = this.fromdate.day.toString().padStart(2, '0')+'-'+this.fromdate.month.toString().padStart(2, '0')+'-'+this.fromdate.year.toString().substr(-2);
    } else {
      fromdate = this.currentDate;
    }
    
    if(this.todate) {
      todate = this.todate.day.toString().padStart(2, '0')+'-'+this.todate.month.toString().padStart(2, '0')+'-'+this.todate.year.toString().substr(-2);
    } else {
      todate = this.currentDate;
    }
    
    let dateval = 'fromdate='+fromdate+'&todate='+todate;
    this._salesService.getSalesDetail(dateval).subscribe(res => {
      this.salesData = res;
      
     })
  }

 

 
}
