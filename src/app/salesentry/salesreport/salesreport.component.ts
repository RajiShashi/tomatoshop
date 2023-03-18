import { Component, OnInit } from '@angular/core';
import { SalesentryserviceService } from '../salesentryservice.service';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css']
})
export class SalesreportComponent implements OnInit {


  constructor(private _inwordService: SalesentryserviceService) { }

  ngOnInit(): void {
   
  }

}
