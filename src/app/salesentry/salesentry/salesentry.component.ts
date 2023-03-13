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

  // products = [
  //   { name: 'Tomato' },
  //   { name: 'Drumstick' },
  //   { name: 'GreenChilly' },
  //   { name: 'GreenPeas' },
  //   { name: 'Brinjal' },
  // ];

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

  customerid!: number;
  customers!: any[];
  farmerType!: any[];
  businessManType!: any[];


  salesmaster: any[] = [];
  productList: any[] = [];
  model!: NgbDateStruct;
  window: any;
  validation: boolean = false;

  //autocomplete
  keyword = 'name';
  tomato: any;
  disableTextbox = false;

  lessToll: number = 0;
  lessWages: number = 0;
  lessCommision: number = 0;
  totalAmount: any = 0;

  constructor(@Inject(DOCUMENT) private _document: any, private fb: FormBuilder, private _salesService: SalesentryserviceService) {
    this.window = this._document.defaultView;
    console.log('document', _document)
  }
  //constructor(private _document: @Inject(DOCUMENT) , private fb: FormBuilder, private _salesService: SalesentryserviceService) { }

  ngOnInit(): void {

    this._salesService.getAllCustomer().subscribe(c => {
      this.customers = c?.data;
      this.customers.forEach((value, index) => {
        value.pname = this.window.ConvertToo('Tscii', value.pname);
      });

      this.farmerType = this.customers.filter(farmer => farmer.category == "FORMER");
      this.businessManType = this.customers.filter(business => business.category == "CUSTOMER");
    });


    this._salesService.getBillno(0).subscribe(res => {
     let billnoval = 0; 
     if(res[0] && res[0].billno) {
      billnoval = res[0].billno;
     }
      this.salesForm.controls['billno'].setValue(Number(billnoval) + 1);
    })

    this._salesService.getProductList().subscribe(res => {
      this.productList = res['data'];
      this.productList.forEach((value, index) => {
        value.name = this.window.ConvertToo('Tscii', value.name);
      });
    })

    this._salesService.getPurchaseDetail(2).subscribe(res => {
      console.log(res);
      
     })

    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear().toString().substr(-2);;
    let todayDate = dd + '-' + mm + '-' + yyyy;

    this.salesForm = this.fb.group({
      outVegitable: this.fb.group({
        businessMan: ["", Validators.required],
        outProduct: ["", Validators.required],
        outKgs: [""],
        outPack: [""],
        outRate: ["", Validators.required],
        outAmount: [""]
      }),
      inVegitable: this.fb.group({
        product: ["", Validators.required],
        kgs: [""],
        pack: ["", Validators.required],
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
      credit: [],
      totalamount: []
    })

    this.packForm = this.fb.group({
      'inPackModalArray': this.fb.array([])
    })

  }

  selectEvent(item: any) {
    console.log(item)
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  selectBusinessman(value: any): void {
    this.customerid = value;
    
  }

  selectProduct() {
   if(this.product.nativeElement.value == 'தக்காளி') {
     this.disableTextbox = false;
   } else {
    this.disableTextbox = true;;
   }
    
  }

  onSelected(value: any): void {
    this.customerid = value;
  }

  get inPackModalArr(): FormArray {
    return this.packForm.get("inPackModalArray") as FormArray;
  }

  openModal() {
    if (this.product.nativeElement.value == "தக்காளி") {
      //this.disableTextbox = !this.disableTextbox;
    }
    else {
      this.currentPackinfo = Number(this.pack.nativeElement.value);
      for (let i = 0; i < Number(this.currentPackinfo); i++) {
        const packGroup = this.fb.group({
          modalPack: ''
        });
        this.inPackModalArr.push(packGroup);
      }
      this.modalOpen = true;
    }
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
    this.valArray = [];
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

  onBlurOutRate(): void {

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

    let tomatoAmt = 0;
    if (this.outProduct.nativeElement.value == "தக்காளி") {
      tomatoAmt = this.outPack.nativeElement.value * this.outRate.nativeElement.value
    }
    else {
      tomatoAmt = this.outKgs.nativeElement.value * this.outRate.nativeElement.value
    }

    const outProductsGroup = this.fb.group({
      businessMan: [this.businessMan.nativeElement.value],
      outProduct: [this.outProduct.nativeElement.value],
      outKgs: [this.outKgs.nativeElement.value],
      outPack: [this.outPack.nativeElement.value],
      outRate: [this.outRate.nativeElement.value],
      outAmount: tomatoAmt
    })

    // step:1
    let inwordArray = this.salesForm.get("inword")?.get("inProductsArray")?.value.filter((v: any) => v.product == this.outProduct.nativeElement.value);

    let productName = (inwordArray[0].product);

    if (productName == "தக்காளி") {
      //step:1
      let totalInPack = inwordArray[0].pack;
      console.log(totalInPack);

      //step:2
      let totalOutPack = this.outPack.nativeElement.value;
      console.log(totalOutPack);

      //step:3
      let outwordArray = this.salesForm.get("outword")?.value.outProductsArray;

      let totalOutwordPack = outwordArray.filter((v: any) => v.outProduct == this.outProduct.nativeElement.value).map((v: any) => v.outPack).reduce((a: any, b: any) => parseInt(a) + parseInt(b), 0);

      totalOutwordPack = parseInt(totalOutwordPack) + parseInt(totalOutPack);

      //step:4
      let valid = true;
      this.validation = true;
      if (totalOutwordPack > totalInPack) {
        alert("OutPack exceed than InPack..");
        valid = false;
        this.validation = false;
      }

      //step:5
      if (valid) {
        this.outProductsArr.push(outProductsGroup);

        if (parseInt(totalOutwordPack) == parseInt(totalInPack)) {
          let i = this.productsName.findIndex(x => x == this.outProduct.nativeElement.value);
          this.productsName.splice(i, 1);
        }
      }

    }
    else {

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
      }
    }

    this.businessMan.nativeElement.value = "";
    this.outProduct.nativeElement.value = "";
    this.outKgs.nativeElement.value = "";
    this.outPack.nativeElement.value = "";
    this.outRate.nativeElement.value = "";
    this.outAmount.nativeElement.value = "";

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
    let tomatoAmt = 0;
    if (this.product.nativeElement.value == "தக்காளி") {
      tomatoAmt = this.pack.nativeElement.value * this.rate.nativeElement.value
    }
    else {
      tomatoAmt = this.kgs.nativeElement.value * this.rate.nativeElement.value
    }

    const inProductsGroup = this.fb.group({
      product: [this.product.nativeElement.value],
      kgs: [this.kgs.nativeElement.value],
      pack: [this.pack.nativeElement.value],
      rate: [this.rate.nativeElement.value],
      amount: tomatoAmt,
      packValue: [this.packArray]
    })


    this.inProductsArr.push(inProductsGroup);

    this.productsName.push(this.product.nativeElement.value);

    let comm = Math.round((10 / 100) * this.amount.nativeElement.value);
    let commVal = this.salesForm.get("commision")?.value;
    this.salesForm.get("commision")?.setValue(commVal + comm);
    this.lessCommision = comm;

    if (this.product.nativeElement.value == "தக்காளி") {

      let tollTom = 2 * this.pack.nativeElement.value;
      let tollValTom = this.salesForm.get("toll")?.value;
      this.salesForm.get("toll")?.setValue(tollValTom + tollTom);
      this.lessToll = tollTom;

      let wagesTom = 2 * this.pack.nativeElement.value;
      let wagesValTom = this.salesForm.get("wages")?.value;
      this.salesForm.get("wages")?.setValue(wagesValTom + wagesTom);
      this.lessWages = wagesTom;

    }
    else {
      for (let i = 0; i < this.valArray.length; i++) {

        if (this.valArray[i] >= 10 && this.valArray[i] <= 20) {

          let totRate = this.rate.nativeElement.value * Number(this.valArray[i]);

          let toll = Math.round((1 / 100) * totRate);
          let tollVal = this.salesForm.get("toll")?.value;
          this.salesForm.get("toll")?.setValue(tollVal + toll);
          this.lessToll = this.lessToll + toll;

          let wages = Math.round((1 / 100) * totRate);
          let wagesVal = this.salesForm.get("wages")?.value;
          this.salesForm.get("wages")?.setValue(wagesVal + wages);
          this.lessWages = this.lessWages + wages;

        }

        else if (this.valArray[i] >= 20 && this.valArray[i] <= 40) {
          let totRate = this.rate.nativeElement.value * Number(this.valArray[i]);

          let toll = Math.round((3 / 100) * totRate);
          let tollVal = this.salesForm.get("toll")?.value;
          this.salesForm.get("toll")?.setValue(tollVal + toll);
          this.lessToll = this.lessToll + toll;

          let wages = Math.round((3 / 100) * totRate);
          let wagesVal = this.salesForm.get("wages")?.value;
          this.salesForm.get("wages")?.setValue(wagesVal + wages);
          this.lessWages = this.lessWages + wages;
        }

        else if (this.valArray[i] >= 40) {
          let totRate = this.rate.nativeElement.value * Number(this.valArray[i]);

          let toll = Math.round((5 / 100) * totRate);
          let tollVal = this.salesForm.get("toll")?.value;
          this.salesForm.get("toll")?.setValue(tollVal + toll);
          this.lessToll = this.lessToll + toll;

          let wages = Math.round((5 / 100) * totRate);
          let wagesVal = this.salesForm.get("wages")?.value;
          this.salesForm.get("wages")?.setValue(wagesVal + wages);
          this.lessWages = this.lessWages + wages;
        }

      }
    }

    // let lessCom = this.salesForm.get("commision")?.value;
    // let lessToll = this.salesForm.get("toll")?.value;
    // let lessWages = this.salesForm.get("wages")?.value;

    let lessAmount = this.amount.nativeElement.value;
    let totAmt = this.salesForm.get("totalamount")?.value;

    if (totAmt == null) {
      totAmt = parseInt(lessAmount) - this.lessCommision - this.lessToll - this.lessWages;
      this.salesForm.get("totalamount")?.setValue(totAmt);
    }
    else {
      lessAmount = parseInt(lessAmount) - this.lessCommision - this.lessToll - this.lessWages;
      totAmt = this.salesForm.get("totalamount")?.value;
      this.salesForm.get("totalamount")?.setValue(parseInt(lessAmount) + parseInt(totAmt));
    }
    this.totalAmount = this.salesForm.get("totalamount")?.value;

    this.product.nativeElement.value = "";
    this.kgs.nativeElement.value = "";
    this.pack.nativeElement.value = "";
    this.rate.nativeElement.value = "";
    this.amount.nativeElement.value = "";
    this.valArray = [];
    this.lessCommision = 0;
    this.lessToll = 0;
    this.lessWages = 0;
    this.disableTextbox = false;


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
    else {
      let inAmount = this.rate.nativeElement.value * this.pack.nativeElement.value;
      this.amount.nativeElement.value = inAmount;
      // this.kgs.nativeElement.value = "";
    }
  }

  onBlurInPack(): void {
    if (this.product.nativeElement.value == "தக்காளி") {

    }
    else {


    }
  }

  onBlurRent(): void {
    let rent = this.salesForm.get("rent")?.value;
    let lessTotAmt = this.salesForm.get("totalamount")?.value;
    if (rent != null && lessTotAmt != null) {
      this.salesForm.get("totalamount")?.setValue(lessTotAmt - rent);
    }
    this.totalAmount = this.salesForm.get("totalamount")?.value;

  }

  onBlurInProduct(): void {
    if (this.product.nativeElement.value == "தக்காளி") {
      // this.tomato = false;
      // var result = document.getElementsByClassName("fa-plus");
      // (result[0].classList).remove('fa-plus');

      this.modalOpen = false;
      this.kgs.nativeElement.disabled = true;
    }
  }

  onClickSubmit(): any {

    console.log(this.inProductsArr, this.outProductsArr);

    let productValidation = true;
    let inword: any = [];
    let outword: any = [];

    this.inProductsArr.controls.forEach(function (value, index) {
      (inword[value.value.product]) ? '' : inword[value.value.product] = 0;
      if(value.value.product == 'தக்காளி') {
        inword[value.value.product] = Number(inword[value.value.product]) + Number(value.value.pack)
      } else {
        inword[value.value.product] = Number(inword[value.value.product]) + Number(value.value.kgs)
      }
    });

    this.outProductsArr.controls.forEach(function (value, index) {
      (outword[value.value.outProduct]) ? '' : outword[value.value.outProduct] = 0;
      if(value.value.outProduct == 'தக்காளி') {
        outword[value.value.outProduct] = Number(outword[value.value.outProduct]) + Number(value.value.outPack)
      } else {
        outword[value.value.outProduct] = Number(outword[value.value.outProduct]) + Number(value.value.outKgs)
      }
      
    });

    if (this.salesForm.get("farmerName")?.value == null && productValidation) {
      alert("Please select farmer");
      productValidation = false;
      return false;
    }

    if (Object.keys(inword).length > 0) {
      Object.keys(inword).forEach(function (val: any, ind: any) {
        console.log(val, ind);
        if (!outword[val] || inword[val] > outword[val]) {
          productValidation = false;
          alert(val + " Kgs not matched with inword entry");
          return;
        }
      });
    } else {
      alert("Please enter values");
      productValidation = false;
    }

    if (!productValidation) {
      return false;
    }


    let sales = {
      'billno': this.salesForm.get("billno")?.value,
      'date': this.salesForm.get("date")?.value,
      'customerid': this.salesForm.get("farmerName")?.value,
      'commission': this.salesForm.get("commision")?.value,
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

  onClickCancel():void {
    //this.salesForm.reset(this.salesForm.value);
    window.location.reload();
  }

}
