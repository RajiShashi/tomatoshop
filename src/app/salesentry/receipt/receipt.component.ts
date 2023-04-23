import { Component, OnInit, Inject } from '@angular/core';
import { SalesentryserviceService } from '../salesentryservice.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

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
  date: any;
  myGroup: any;
  businessManVal: any;
  
  keyword = 'code';
  data = [];
  pname = 'pname';
  name:any;

  constructor(private _salesService: SalesentryserviceService, @Inject(DOCUMENT) private _document: any ) {this.window = this._document.defaultView; }

  ngOnInit(): void {
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear().toString().substr(-2);
    this.date = dd + '-' + mm + '-' + yyyy;

    this._salesService.getAllCustomer().subscribe(c => {
      this.customers = c?.data;
      this.customers.forEach((value, index) => {
        value.pname = this.window.ConvertToo('Tscii', value.pname);
      });

      this.farmerType = this.customers.filter(farmer => farmer.category == "FORMER");
      console.log(this.farmerType);
      this.businessManType = this.customers.filter(business => business.category == "CUSTOMER");
    });

  }

  selectBusinessman(val:any): void {
    this.businessManVal = val;
    let param = 'businessname='+this.businessManVal;
    if(this.businessManVal && this.businessManVal != '') {
      this._salesService.getSalesDetail(param).subscribe(res => {
        console.log(res[0] );
        this.previousBalance = 0;
        if(res[0] && res[0]['totalamount']) {
          this.previousBalance = res[0]['totalamount'];
        }
        
      })
    }
  }

  saveReceipt(f: NgForm) {
    
    let receipt = {
      date: this.date,
      downpayment:this.downpayment,
      discount:this.discount,
      customername: this.businessManVal
    }
    if(this.downpayment && this.downpayment != '' && this.discount && this.discount != '' && this.businessManVal && this.businessManVal != '') {

    
      this._salesService.saveReceipt(receipt).subscribe(data => {
        alert("Receipt added successfully..");
        this.downpayment = '';
        this.discount = '';
        this.businessManVal = '';
        this.balance = '';
        this.previousBalance = 0;
      })
    } else {
      alert("Please enter the all values");
    }
  }

  returnToSales() {

  }

  updateDiscount() {
    if(this.downpayment) {
      this.discount = (3*this.downpayment/100);
      this.balance = Number(this.previousBalance) - (Number(this.downpayment) + Number(this.discount));
    }
  }

  updateDiscountVal() {
    this.balance = Number(this.previousBalance) - (Number(this.downpayment) + Number(this.discount));
  }

  


  selectEvent(item: any) {
    console.log(item);
    this.selectBusinessman(item.pname);
    this.name = item.pname;
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e: any){
    // do something when input is focused
  }

}
