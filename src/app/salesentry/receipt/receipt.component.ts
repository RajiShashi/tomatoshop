import { Component, OnInit, Inject } from '@angular/core';
import { SalesentryserviceService } from '../salesentryservice.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  customers!: any[];
  farmerType!: any[];
  businessManType!: any[];
  window: any;

  businessMan: any;
  previousBalance: any;
  downpayment: any;
  discount: any;
  balance: any;
  myGroup: any;
  
  constructor(private _salesService: SalesentryserviceService, @Inject(DOCUMENT) private _document: any ) {this.window = this._document.defaultView; }

  ngOnInit(): void {
    
    this._salesService.getAllCustomer().subscribe(c => {
      this.customers = c?.data;
      this.customers.forEach((value, index) => {
        value.pname = this.window.ConvertToo('Tscii', value.pname);
      });

      this.farmerType = this.customers.filter(farmer => farmer.category == "FORMER");
      this.businessManType = this.customers.filter(business => business.category == "CUSTOMER");
    });

  }

  selectBusinessman(value: any): void {
    console.log(value);
    let param = 'businessname='+value;
    this._salesService.getSalesDetail(param).subscribe(res => {
      console.log(res[0] );
      this.previousBalance = 0;
      if(res[0] && res[0]['totalamount']) {
        this.previousBalance = res[0]['totalamount'];
      }
      
     })
  }

  saveReceipt() {
    
  }

  returnToSales() {

  }

}
