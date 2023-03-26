import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { ICustomers } from '../ICustomers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!: ICustomers[];
  dtOptions: DataTables.Settings = {};

  constructor(private _customerservice: CustomersService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this._customerservice.getAllCustomer().subscribe(data => {
      this.customers = data.data;
    })

  }

}
