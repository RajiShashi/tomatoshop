import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/customers/customers.service';
import { SalesentryserviceService } from '../salesentryservice.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  selectTypes = [
    { id: 1, type: "Commision" },
    { id: 2, type: "Toll" },
    { id: 3, type: "Wages" },
    { id: 1, type: "Rent" },
    { id: 2, type: "Debit" }
  ];

  fromDate!: Date;
  toDate!: Date;
  selectType!: string;

  typeValue!: string;

  constructor(private _salesService: SalesentryserviceService) { }

  ngOnInit(): void {

  }

  onChange(value: string) {
    this.typeValue = value;
  }
  getReportDetails(f: NgForm) {
    alert(f.value);
    console.log(f.value);
    // fromDate
    // toDate
    // selectType
    // this._salesService.getReportDetails().subscribe(data => {
    // });
  }

}
