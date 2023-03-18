import { Component, OnInit } from '@angular/core';
import { SalesentryserviceService } from '../salesentryservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salesmanreport',
  templateUrl: './salesmanreport.component.html',
  styleUrls: ['./salesmanreport.component.css']
})
export class SalesmanreportComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  salesData: any;
  queryparam: any = '';

  constructor(private _salesService: SalesentryserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.queryparam = this.route.snapshot.paramMap.get('id');
    console.log(this.queryparam);
    let param = 'bman='+this.queryparam;
    this._salesService.getSalesDetail(this.queryparam).subscribe(res => {
      this.salesData = res;
      
     })
  }

}
