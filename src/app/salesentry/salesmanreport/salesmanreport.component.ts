import { Component, OnInit } from '@angular/core';
import { SalesentryserviceService } from '../salesentryservice.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { RouterModule, Router  } from '@angular/router';

@Component({
  selector: 'app-salesmanreport',
  templateUrl: './salesmanreport.component.html',
  styleUrls: ['./salesmanreport.component.css']
})
export class SalesmanreportComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  salesData: any;
  queryparam: any = '';
  cooley: any;
  salesTotal: any = 0;

  constructor(private _salesService: SalesentryserviceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.queryparam = this.route.snapshot.paramMap.get('id');
    console.log(this.queryparam);
    let param = 'bman='+this.queryparam;
    this._salesService.getSalesDetail(param).subscribe(res => {
      this.salesData = res;
      this.salesTotal= 0;
      this.salesData.forEach((val: any, key: any) => {
        this.salesTotal += val.amount;
      });
     })
  }

  saveBill(f: NgForm) {
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear().toString();
    let date = dd + '-' + mm + '-' + yyyy.substr(-2);
    let receipt = {
      date: date,
      amount: this.salesTotal,
      customername: this.queryparam,
      cooley:this.cooley
    }
    if(this.cooley && this.cooley != '') {

    
      this._salesService.salesUpdate(receipt).subscribe(data => {
        alert("Receipt added successfully..");
        this.router.navigate(['salesreport']);
        
      })
    } else {
      alert("Please enter the all values");
    }
  }

}
