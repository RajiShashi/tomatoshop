import { Component, OnInit, Inject } from '@angular/core';
import { SalesentryserviceService } from '../salesentryservice.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-customerreport',
  templateUrl: './customerreport.component.html',
  styleUrls: ['./customerreport.component.css']
})
export class CustomerreportComponent implements OnInit {

  customers!: any[];
  farmerType!: any[];
  businessManType!: any[];
  window: any;


  dtOptions: DataTables.Settings = {};
  salesData: any = [];
  todayDate: any;
  fromdate: any;
  todate: any;
  currentDate: any;


  constructor(private _salesService: SalesentryserviceService, @Inject(DOCUMENT) private _document: any ) {this.window = this._document.defaultView; }

  
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
    this._salesService.getAllCustomer().subscribe(c => {
      this.customers = c?.data;
      this.customers.forEach((value, index) => {
        value.pname = this.window.ConvertToo('Tscii', value.pname);
      });

      this.farmerType = this.customers.filter(farmer => farmer.category == "FORMER");
      this.businessManType = this.customers.filter(business => business.category == "CUSTOMER");
    });
    
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

  selectBusinessman(val:any): void {
    
    let param = 'customername='+val;
    if(val && val != '') {
      this._salesService.getSalesDetail(param).subscribe(res => {
        console.log(res[0] );
        this.salesData = res;
        
      })
    }
  }

 
}
