import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackmodelComponent } from '../packmodel/packmodel.component';
PackmodelComponent
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-salesentry',
  templateUrl: './salesentry.component.html',
  styleUrls: ['./salesentry.component.css']
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

  // closeResult = '';
  // numb!: number;

  currentPackinfo = 0;
  modalOpen: boolean = false;
  packArray: any[] = [];
  packForm!: FormGroup;

  constructor(private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.salesForm = this.fb.group({
      outVegitable: this.fb.group({
        businessMan: "",
        outProduct: "",
        outKgs: "",
        outPack: "",
        outRate: "",
        outAmount: ""
      }),
      inVegitable: this.fb.group({
        product: ["", Validators.required],
        kgs: ["", Validators.required],
        pack: ["", Validators.required],
        rate: "",
        amount: ""
      }),
      inword: this.fb.group({
        'billno': ["", Validators.required],
        'date': [],
        'farmerName': [],
        'inProductsArray': this.fb.array([])
      }),
      commision: [],
      toll: [],
      wages: [],
      outword: this.fb.group({
        'businessMan': '',
        'outProductsArray': this.fb.array([])
      })
    })

    this.packForm = this.fb.group({
      'inPackModalArray': this.fb.array([])
    })
  }

  get inPackModalArr(): FormArray {
    return this.packForm.get("inPackModalArray") as FormArray;
  }


  openModal() {
    // alert("hii");
    this.packArray = [];
    this.currentPackinfo = this.pack.nativeElement.value;

    for (let i = 0; i < Number(this.currentPackinfo); i++) {
      this.packArray.push(i);
    }
    this.modalOpen = true;

  }

  closeModal() {
    this.modalOpen = false;
    this.pack.nativeElement.value = "";
  }

  saveModel() {
    alert("success");
    const packGroup = this.fb.group({
      modalPack: this.packForm.controls['modalPack'].value,
    })

    this.inPackModalArr.push(packGroup);
  }

  get inVegitable(): FormGroup {
    return this.salesForm.get("inVegitable") as FormGroup;
  }

  get outword(): FormGroup {
    return this.salesForm.get("outword") as FormGroup;
  }

  get outProductsArr(): FormArray {
    return this.outword.get("outProductsArray") as FormArray;
  }

  onBlurOutKgs(): void {
    if (this.outKgs.nativeElement.value != 0) {
      this.outPack.nativeElement.value = "";
    }
  }

  onBlurOutPack(): void {
    if (this.outPack.nativeElement.value != 0) {
      this.outKgs.nativeElement.value = "";
    }
  }

  onBlurOutRate(): void {
    if (this.outKgs.nativeElement.value != 0) {
      let outAmount = this.outKgs.nativeElement.value * this.outRate.nativeElement.value;
      this.outAmount.nativeElement.value = outAmount;
      this.outPack.nativeElement.value = "";
    }
    else {
      let outAmount = this.outRate.nativeElement.value * this.outPack.nativeElement.value;
      this.outAmount.nativeElement.value = outAmount;
      this.outKgs.nativeElement.value = "";
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
    if (totalOutwordKgs > totalInKgs) {
      alert("OutKgs exceed than InKgs..");
      valid = false;
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
    const inProductsGroup = this.fb.group({
      product: [this.product.nativeElement.value],
      kgs: [this.kgs.nativeElement.value],
      pack: [this.pack.nativeElement.value],
      rate: [this.rate.nativeElement.value],
      amount: [this.kgs.nativeElement.value * this.rate.nativeElement.value]
    })

    this.inProductsArr.push(inProductsGroup);
    console.log(this.inProductsArr);
    this.productsName.push(this.product.nativeElement.value);


    // let kg = this.salesForm.get("inVegitable")?.get("kgs")?.value;
    // let pack = this.salesForm.get("inVegitable")?.get("pack")?.value;
    // let rate = this.salesForm.get("inVegitable")?.get("rate")?.value;

    let comm = Math.round((10 / 100) * this.amount.nativeElement.value);
    let commVal = this.salesForm.get("commision")?.value;
    this.salesForm.get("commision")?.setValue(commVal + comm);

    let toll = Math.round((1 / 100) * this.amount.nativeElement.value);
    let tollVal = this.salesForm.get("toll")?.value;
    this.salesForm.get("toll")?.setValue(tollVal + toll);

    let wages = Math.round((3 / 100) * this.amount.nativeElement.value);
    let wagesVal = this.salesForm.get("wages")?.value;
    this.salesForm.get("wages")?.setValue(wagesVal + wages);

    this.product.nativeElement.value = "";
    this.kgs.nativeElement.value = "";
    this.pack.nativeElement.value = "";
    this.rate.nativeElement.value = "";
    this.amount.nativeElement.value = "";

  }

  removeInProducts(index: any): void {
    let controls = this.inProductsArr.controls;
    controls.splice(index, 1);
  }

  onBlurInRate(): void {
    if (this.kgs.nativeElement.value != 0) {
      let inAmount = this.kgs.nativeElement.value * this.rate.nativeElement.value;
      this.amount.nativeElement.value = inAmount;
      this.pack.nativeElement.value = "";
    }
    else {
      let inAmount = this.rate.nativeElement.value * this.pack.nativeElement.value;
      this.amount.nativeElement.value = inAmount;
      this.kgs.nativeElement.value = "";
    }
  }

  onBlurInKgs(): void {
    if (this.kgs.nativeElement.value != 0) {
      this.pack.nativeElement.value = "";
    }
  }

  onBlurInPack(): void {
    if (this.pack.nativeElement.value != 0) {
      this.kgs.nativeElement.value = "";
    }
  }

  onBlurInProduct(): void {
    if (this.product.nativeElement.value == "Tomato") {
      this.kgs.nativeElement.disabled = true;
    }
    else {
      this.kgs.nativeElement.disabled = false;
    }
  }

}
