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

  constructor(private _salesEntryService: SalesentryserviceService) {
    this.refreshCountries();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this._salesEntryService.getAllInwardDetails().subscribe(data => {
    
      this.inwordDatas = data.data;
      console.log(this.inwordDatas);
     // this.collectionSize = this.inwordDatas.length;
    })

  }

  refreshCountries() {
    this.inwordDatas = this.inwordDatas.map((data, i) => ({ id: i + 1, ...data })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

}
