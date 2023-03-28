import { Component, OnInit } from '@angular/core';
import { SalesentryserviceService } from '../salesentryservice.service';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-purchasereport',
  templateUrl: './purchasereport.component.html',
  styleUrls: ['./purchasereport.component.css']
})
export class PurchasereportComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize!: any;
  countries!: any[];

  inwordDatas: any[] = [];
  dtOptions: DataTables.Settings = {};

  todayDate: any;
  fromdate: any;
  todate: any;
  currentDate: any;

  constructor(private _salesEntryService: SalesentryserviceService) {
    this.refreshCountries();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear().toString();
    this.currentDate = dd + '-' + mm + '-' + yyyy.substr(-2);
    this.todayDate = yyyy + '-' + mm + '-' + dd;;
    let dateval = 'fromdate='+this.currentDate+'&todate='+this.currentDate;
    this._salesEntryService.getAllInwardDetails(dateval).subscribe(data => {
      this.inwordDatas = data.data;
    })

  }

  refreshCountries() {
    this.inwordDatas = this.inwordDatas.map((data, i) => ({ id: i + 1, ...data })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
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
    this._salesEntryService.getAllInwardDetails(dateval).subscribe(data => {
      this.inwordDatas = data.data;
    })
  }

}
