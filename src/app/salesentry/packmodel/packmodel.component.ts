import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-packmodel',
  templateUrl: './packmodel.component.html',
  styleUrls: ['./packmodel.component.css']
})

export class PackmodelComponent implements OnInit {

  @Input() numb!: number;
  @Input() public user: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  packKgs: number[] = [];

  constructor() { }

  ngOnInit(): void {
    alert(this.numb)
    console.log(this.numb)
  }
  counter(numb: number) {
    return new Array(numb);
}
  closeModal(sendData: any) {
    //this.activeModal.close(sendData);
  }

  passBack() {
    this.passEntry.emit(this.user);
   // this.activeModal.close(this.user);
    }

    

 






}
