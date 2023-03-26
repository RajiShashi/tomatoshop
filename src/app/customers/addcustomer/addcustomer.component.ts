import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesentryserviceService } from 'src/app/salesentry/salesentryservice.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {

  selectCustomer = [
    {id: 1, type: "FARMER"},
    {id: 2, type: "CUSTOMER"}
    // {id: 3, type: "Others"},
 ];

  selectedUser!: string;
  //addCustomer: IAddcustomer[] = [] as IAddcustomer[];
  addCustomer: any[] = [];
  id: number = 0;
  customername!: string;
  customertype!: string;
  address!: string;
  outletarea!: string;
  phonenumber!: number;
  tinnumber!: number;

  customerValue!: string;


  constructor(private _router: Router, private _activate: ActivatedRoute, private _customerservice: SalesentryserviceService) { }

  ngOnInit(): void {
    this.id = this._activate.snapshot.params["route"];
    if (this.id != undefined) {
      this._customerservice.getCustomer(this.id).subscribe(data => {
        if (data) {
          this.customername = data.data[0].customername;
          this.customertype = this.customerValue;
          this.address = data.data[0].address;
          this.outletarea = data.data[0].outletarea;
          this.phonenumber = data.data[0].phonenumber;
          this.tinnumber = data.data[0].tinnumber;
        }
      })
    } else {
      this.id = 0;
    }
  }

  onChange(value: string) {
    this.customerValue = value;
  }

  saveCustomer(f: NgForm): void {
    // alert(f.value);
    this._customerservice.saveCustomer(f.value).subscribe(data => {
      this.addCustomer.push(f.value);
      alert("Customer added successfully..");
      f.reset();
    })
    this._router.navigate(['/customers']);
  }

  updateCustomer(f: NgForm): void {
    // console.log(f.value);
    if (this.id == 0) {
      alert("Customer not found..");
    }
    this._customerservice.updateCustomer(f.value, this.id).subscribe(data => {
      console.log(data);
      // alert(JSON.stringify(data.data));
      let index = this.addCustomer.findIndex(u => u.id == this.id);
      this.addCustomer[index] = data;
      f.reset();
      alert("Customer Updated successfully...");
    })
    this._router.navigate(['/customers']);
  }

}
