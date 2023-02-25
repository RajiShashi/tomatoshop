import { Component, ElementRef, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SalesentryserviceService } from '../salesentryservice.service';
import { ICustomers } from 'src/app/customers/ICustomers';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-salesentry',
  templateUrl: './salesentry.component.html',
  styleUrls: ['./salesentry.component.css'],
  
})

export class SalesentryComponent implements OnInit {

  @ViewChild("product") product!: ElementRef;
  @ViewChild("kgs") kgs!: ElementRef;
  @ViewChild("pack") pack!: ElementRef;
  @ViewChild("rate") rate!: ElementRef;
  @ViewChild("amount") amount!: ElementRef;

  @ViewChild("businessMan") businessMan!: ElementRef;
  @ViewChild("outProduct") outProduct!: ElementRef;
  @ViewChild("outKgs") outKgs!: ElementRef;
  @ViewChild("outPack") outPack!: ElementRef;
  @ViewChild("outRate") outRate!: ElementRef;
  @ViewChild("outAmount") outAmount!: ElementRef;

  products = [
    { name: 'Tomato' },
    { name: 'Drumstick' },
    { name: 'GreenChilly' },
    { name: 'GreenPeas' },
    { name: 'Brinjal' },
  ];

  productsName: any[] = [];
  getInArray: any[] = [];
  getOutArray: any[] = [];

  salesForm!: FormGroup;
  sum: number = 0;
  lessKgs: number = 0;
  outProductSum: any[] = [];

  currentPackinfo = 0;
  modalOpen: boolean = false;
  packArray: any[] = [];
  valArray: any[] = [];
  packForm!: FormGroup;

  customers!: any[];
  farmerType!: any[];
  businessManType!: any[];
  customerid!: number;

  salesmaster: any[] = [];
  productList: any[] = [];
  model!: NgbDateStruct;
  window: any;
  validation: boolean = false;

  constructor(@Inject(DOCUMENT) private _document: any, private fb: FormBuilder, private _salesService: SalesentryserviceService) {
    this.window = this._document.defaultView;
    console.log('document', _document)
  }
  //constructor(private _document: @Inject(DOCUMENT) , private fb: FormBuilder, private _salesService: SalesentryserviceService) { }

  ngOnInit(): void {

    this._salesService.getAllCustomer().subscribe(c => {
      this.customers = c?.data;
      this.customers.forEach((value,index) =>{
        value.pname = this.window.ConvertToo('Tscii',value.pname);
      });
      this.farmerType = this.customers.filter(farmer => farmer.category == "FORMER");
      this.businessManType = this.customers.filter(business => business.category == "CUSTOMER");
    });

    this._salesService.getBillno(0).subscribe(res => {
      this.salesForm.controls['billno'].setValue(res['data'][0].billno+1) ;
    })

    this._salesService.getProductList().subscribe(res => {
      this.productList = res['data'];
      this.productList.forEach((value,index) =>{
        value.name = this.window.ConvertToo('Tscii',value.name);
      });
    })
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear().toString().substr(-2);;
    let todayDate = dd + '-' + mm + '-' + yyyy;
    this.salesForm = this.fb.group({
    outVegitable: this.fb.group({
        businessMan: ["",Validators.required],
        outProduct: [""],
        outKgs: [""],
        outPack: [""],
        outRate: [""],
        outAmount: [""]
      }),
      inVegitable: this.fb.group({
        product: ["",Validators.required],
        kgs: [""],
        pack: ["",Validators.required],
        rate: [""],
        amount: [""]
      }),
      inword: this.fb.group({
        'inProductsArray': this.fb.array([])
      }),
      outword: this.fb.group({
        businessMan: [],
        'outProductsArray': this.fb.array([])
      }),
      billno: [],
      date: [todayDate],
      farmerName: [],
      commision: [],
      toll: [],
      wages: [],
      debit: [],
      rent: [],
      credit: []
    })

    this.packForm = this.fb.group({
      'inPackModalArray': this.fb.array([])
    })

  }

  selectBusinessman(value: any): void {
    this.customerid = value;
  }

  onSelected(value: any): void {
    this.customerid = value;
  }

  get inPackModalArr(): FormArray {
    return this.packForm.get("inPackModalArray") as FormArray;
  }

  openModal() {
    this.currentPackinfo = Number(this.pack.nativeElement.value);
    for (let i = 0; i < Number(this.currentPackinfo); i++) {
      const packGroup = this.fb.group({
        modalPack: ''
      });
      this.inPackModalArr.push(packGroup);
    }
    this.modalOpen = true;

  }

  closeModal() {
    this.modalOpen = false;
    this.pack.nativeElement.value = "";

    const control = <FormArray>this.packForm.controls['inPackModalArray'];
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i)
    }

  }

  saveModel() {
    // let valArray = [];
    //this.pack.nativeElement.value = "";
    this.packArray = this.packForm.get("inPackModalArray")?.value;
    console.log(this.packArray);

    for (let i = 0; i < this.packArray.length; i++) {
      this.valArray.push(this.packArray[i].modalPack)
    }

    var packSum = this.valArray.reduce((acc, cur) => acc + Number(cur), 0)
    this.kgs.nativeElement.value = packSum;


    var packValue = this.valArray.join(',');
    //this.pack.nativeElement.value = packValue;

    const control = <FormArray>this.packForm.controls['inPackModalArray'];
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i)
    }
    this.modalOpen = false;
    console.log(this.packArray);
  }

  get inVegitable(): FormGroup {
    return this.salesForm.get("inVegitable") as FormGroup;
  }

  get outVegitable(): FormGroup {
    return this.salesForm.get("outVegitable") as FormGroup;
  }

  get outword(): FormGroup {
    return this.salesForm.get("outword") as FormGroup;
  }

  get outProductsArr(): FormArray {
    return this.outword.get("outProductsArray") as FormArray;
  }

  onBlurOutKgs(): void {
    // if (this.outKgs.nativeElement.value != 0) {
    //   this.outPack.nativeElement.value = "";
    // }
  }

  onBlurOutPack(): void {
    // if (this.outPack.nativeElement.value != 0) {
    //   this.outKgs.nativeElement.value = "";
    // }
  }

  onBlurOutRate(): void {
    console.log(this.outVegitable);
    if (this.outKgs.nativeElement.value != 0) {
      let outAmount = this.outKgs.nativeElement.value * this.outRate.nativeElement.value;
      this.outAmount.nativeElement.value = outAmount;
      //this.outPack.nativeElement.value = "";
    }
    else {
      let outAmount = this.outRate.nativeElement.value * this.outPack.nativeElement.value;
      this.outAmount.nativeElement.value = outAmount;
      //this.outKgs.nativeElement.value = "";
    }
  }

  addOutProductsArray() {
    const outProductsGroup = this.fb.group({
      businessMan: [this.businessMan.nativeElement.value],
      outProduct: [this.outProduct.nativeElement.value],
      outKgs: [this.outKgs.nativeElement.value],
      outPack: [this.outPack.nativeElement.value],
      outRate: [this.outRate.nativeElement.value],
      outAmount: [this.outKgs.nativeElement.value * this.outRate.nativeElement.value]
    })

    // step:1
    let inwordArray = this.salesForm.get("inword")?.get("inProductsArray")?.value.filter((v: any) => v.product == this.outProduct.nativeElement.value);
    let totalInKgs = inwordArray[0].kgs;
    console.log(totalInKgs);

    //step:2
    let totalOutKgs = this.outKgs.nativeElement.value;
    console.log(totalOutKgs);

    //step:3
    let outwordArray = this.salesForm.get("outword")?.value.outProductsArray;
    let totalOutwordKgs = outwordArray.filter((v: any) => v.outProduct == this.outProduct.nativeElement.value).map((v: any) => v.outKgs).reduce((a: any, b: any) => parseInt(a) + parseInt(b), 0);
    totalOutwordKgs = parseInt(totalOutwordKgs) + parseInt(totalOutKgs);

    //step:4
    let valid = true;
    this.validation = true;
    if (totalOutwordKgs > totalInKgs) {
      alert("OutKgs exceed than InKgs..");
      valid = false;
      this.validation = false;
    }

    //step:5
    if (valid) {
      this.outProductsArr.push(outProductsGroup);

      if (parseInt(totalOutwordKgs) == parseInt(totalInKgs)) {
        let i = this.productsName.findIndex(x => x == this.outProduct.nativeElement.value);
        this.productsName.splice(i, 1);
      }
      this.businessMan.nativeElement.value = "";
      this.outProduct.nativeElement.value = "";
      this.outKgs.nativeElement.value = "";
      this.outPack.nativeElement.value = "";
      this.outRate.nativeElement.value = "";
      this.outAmount.nativeElement.value = "";
    }

  }

  removeOutProducts(index: any): void {
    let controls = this.outProductsArr.controls;
    controls.splice(index, 1);
  }

  get inword(): FormGroup {
    return this.salesForm.get("inword") as FormGroup;
  }

  get inProductsArr(): FormArray {
    return this.inword.get("inProductsArray") as FormArray;
  }

  addInProductsArray() {
    console.log(this.packArray);
    const inProductsGroup = this.fb.group({
      product: [this.product.nativeElement.value],
      kgs: [this.kgs.nativeElement.value],
      pack: [this.pack.nativeElement.value],
      rate: [this.rate.nativeElement.value],
      amount: [this.kgs.nativeElement.value * this.rate.nativeElement.value],
      packValue: [this.packArray]
    })
    

    this.inProductsArr.push(inProductsGroup);
    console.log(this.inProductsArr);
    this.productsName.push(this.product.nativeElement.value);

    let comm = Math.round((10 / 100) * this.amount.nativeElement.value);
    let commVal = this.salesForm.get("commision")?.value;
    this.salesForm.get("commision")?.setValue(commVal + comm);

    for (let i = 0; i < this.valArray.length; i++) {

      if (this.valArray[i] >= 10 && this.valArray[i] <= 20) {

        let totRate = this.rate.nativeElement.value * Number(this.valArray[i]);

        let toll = Math.round((1 / 100) * totRate);
        let tollVal = this.salesForm.get("toll")?.value;
        this.salesForm.get("toll")?.setValue(tollVal + toll);

        let wages = Math.round((1 / 100) * totRate);
        let wagesVal = this.salesForm.get("wages")?.value;
        this.salesForm.get("wages")?.setValue(wagesVal + wages);

      }

      else if (this.valArray[i] >= 20 && this.valArray[i] <= 40) {
        let totRate = this.rate.nativeElement.value * Number(this.valArray[i]);

        let toll = Math.round((3 / 100) * totRate);
        let tollVal = this.salesForm.get("toll")?.value;
        this.salesForm.get("toll")?.setValue(tollVal + toll);

        let wages = Math.round((3 / 100) * totRate);
        let wagesVal = this.salesForm.get("wages")?.value;
        this.salesForm.get("wages")?.setValue(wagesVal + wages);
      }

      else if (this.valArray[i] >= 40) {
        let totRate = this.rate.nativeElement.value * Number(this.valArray[i]);

        let toll = Math.round((5 / 100) * totRate);
        let tollVal = this.salesForm.get("toll")?.value;
        this.salesForm.get("toll")?.setValue(tollVal + toll);

        let wages = Math.round((5 / 100) * totRate);
        let wagesVal = this.salesForm.get("wages")?.value;
        this.salesForm.get("wages")?.setValue(wagesVal + wages);
      }

    }

    this.product.nativeElement.value = "";
    this.kgs.nativeElement.value = "";
    this.pack.nativeElement.value = "";
    this.rate.nativeElement.value = "";
    this.amount.nativeElement.value = "";
    this.valArray =[];

  }

  removeInProducts(index: any): void {
    let controls = this.inProductsArr.controls;
    controls.splice(index, 1);
  }

  onBlurInRate(): void {
    if (this.kgs.nativeElement.value != 0) {
      let inAmount = this.kgs.nativeElement.value * this.rate.nativeElement.value;
      this.amount.nativeElement.value = inAmount;
    }
    // else {
    //   let inAmount = this.rate.nativeElement.value * this.pack.nativeElement.value;
    //   this.amount.nativeElement.value = inAmount;
    //  // this.kgs.nativeElement.value = "";
    // }
  }

  onBlurInKgs(): void {
    // if (this.kgs.nativeElement.value != 0) {
    //   this.pack.nativeElement.value = "";
    // }
  }

  onBlurInPack(): void {
    // if (this.pack.nativeElement.value != 0) {
    //   this.kgs.nativeElement.value = "";
    // }
  }

  onBlurInProduct(): void {
    if (this.product.nativeElement.value == "Tomato") {
       this.kgs.nativeElement.disabled = true;
    }
    else {
      // this.kgs.nativeElement.disabled = false;
    }
  }

  onClickSubmit():any  {
    console.log(this.salesForm.valid);
    if(!this.validation) {
      return false;
    }
    let sales = {
      'billno': this.salesForm.get("billno")?.value,
      'date': this.salesForm.get("date")?.value,
      'customerid': this.customerid,
      'commision': this.salesForm.get("commision")?.value,
      'rent': this.salesForm.get("rent")?.value,
      'credit': this.salesForm.get("credit")?.value,
      'wages': this.salesForm.get("wages")?.value,
      'toll': this.salesForm.get("toll")?.value,
      'debit': this.salesForm.get("debit")?.value,
      'refname': this.salesForm.get("refname")?.value,
      'totalamount': this.salesForm.get("totalamount")?.value
    };
    let salesentry = {
      'sales': sales,
      'inwards': this.salesForm.get("inword")?.get("inProductsArray")?.value,
      'outwards': this.salesForm.get("outword")?.get("outProductsArray")?.value
    };
    this._salesService.saveSalesentry(salesentry).subscribe(data => {
      this.salesmaster.push(salesentry);
      alert("Sales entry added successfully..");
      this.salesForm.reset();
      window.location.reload();
    })

  }

  
}
