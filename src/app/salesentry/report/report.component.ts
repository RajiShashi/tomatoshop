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
  public selectedValue: any;
  public searchValue: any;
  public filteredList: any = [];

  maxDate: any ;
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

 

 

  futureDateDisable() {
    var date: any = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();

    if (month < 10) {
      month = '0' + month;
    }

    if (todayDate < 10) {
      todayDate = '0' + todayDate;
    }

    this.maxDate = year + "-" + month + "-" + todayDate;
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
