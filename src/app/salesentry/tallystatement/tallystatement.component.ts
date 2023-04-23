import { Component, OnInit } from '@angular/core';
import { SalesentryserviceService } from '../salesentryservice.service';
import {NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tallystatement',
  templateUrl: './tallystatement.component.html',
  styleUrls: ['./tallystatement.component.css']
})

export class TallystatementComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  tallyData: any = [];
  purchaseTotal: any = 0;
  salesTotal: any= 0;
  model: any;
  todayDate: any;
  sakkucooly: any = 0;
  purchase: any = {
    commission:0,
    cooly:0,
    sungam:0
  };

  constructor(private _salesService: SalesentryserviceService) { }

  
  ngOnInit(): void {
   
    this.dtOptions = { };
    const today = new Date();
    this.model = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear().toString().substr(-2);
    let todayDate = dd + '-' + mm + '-' + yyyy;
    this.todayDate = todayDate;
    this._salesService.getTallydata(todayDate).subscribe(res => {
      this.tallyData = res;
      this.purchaseTotal = 0;
      this.salesTotal = 0;
      this.sakkucooly = 0;
      this.purchase['commission'] = 0;
      this.purchase['cooly'] = 0;
      this.purchase['sungam'] = 0;
      this.tallyData.purchase.forEach((val: any, key: any) => {
        this.sakkucooly += Number(this.tallyData.sales[key].cooly);
        this.purchaseTotal += val.purchaseamount;
        this.salesTotal += this.tallyData.sales[key].amount + Number(this.tallyData.sales[key].cooly);
        this.purchase['commission'] += val.commission; 
        this.purchase['cooly'] += val.cooly; 
        this.purchase['sungam'] += val.sungam; 
      });
      //this.tallyData.purchase.push({'totalpurchase':this.purchaseTotal, 'totalsales':this.salesTotal});
    });
   
  }

  showData() {
   
    let date = this.model.day.toString().padStart(2, '0')+'-'+this.model.month.toString().padStart(2, '0')+'-'+this.model.year.toString().substr(-2);
   
    this._salesService.getTallydata(date).subscribe(res => {
      this.tallyData = res;
      this.purchaseTotal = 0;
      this.salesTotal = 0;
      this.sakkucooly = 0;
      this.purchase['commission'] = 0;
      this.purchase['cooly'] = 0;
      this.purchase['sungam'] = 0;
      this.tallyData.purchase.forEach((val: any, key: any) => {
        this.sakkucooly += Number(this.tallyData.sales[key].cooly);
        this.purchaseTotal += val.purchaseamount;
        this.salesTotal += this.tallyData.sales[key].amount + Number(this.tallyData.sales[key].cooly);
        this.purchase['commission'] += val.commission; 
        this.purchase['cooly'] += val.cooly; 
        this.purchase['sungam'] += val.sungam; 
      });
    });
  }

}
