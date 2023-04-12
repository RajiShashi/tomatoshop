import { Component, OnInit, Inject } from '@angular/core';
import { SalesentryserviceService } from '../salesentryservice.service';
import { DOCUMENT } from '@angular/common';
import { RouterModule, Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-customerbillreport',
  templateUrl: './customerbillreport.component.html',
  styleUrls: ['./customerbillreport.component.css']
})
export class CustomerbillreportComponent implements OnInit {

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

  queryparam: any;
  salesTotal: any;
  noofprint: any;

  constructor(private _salesService: SalesentryserviceService, @Inject(DOCUMENT) private _document: any, private route: ActivatedRoute, private router: Router ) {this.window = this._document.defaultView; }

  
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
    this.queryparam = this.route.snapshot.paramMap.get('id');
    console.log(this.queryparam);
    let param = 'cbillno='+this.queryparam;
    this._salesService.getSalesDetail(param).subscribe(res => {
      this.salesData = res;
      this.noofprint = this.salesData[0].noofprint;
      this.salesTotal= 0;
      this.salesData.forEach((val: any, key: any) => {
        this.salesTotal += val.amount;
      });
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

  savePrint() {
    let printoption = {
      id : this.queryparam,
      print: this.noofprint + 1
    }
    this._salesService.saveSalesPrint(printoption).subscribe(data => {
      alert("Save print successfully");
      this.router.navigate(['customerreport']);
    })
  }

 

 
}
