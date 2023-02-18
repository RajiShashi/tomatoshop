import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
   
  addform!: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.addform = this._fb.group({
      "farmername": ["raji", Validators.required],
      "address": ["dpm", Validators.required],
      "phonenumber": ["9090909090", Validators.required]
    })
  }

}
