import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TodosserviceService } from '../todosservice.service';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ISalesMaster } from '../salesentry/ISalesMaster';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';
import { SalesentryserviceService } from '../salesentry/salesentryservice.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
		NgFor,
		DecimalPipe,
		FormsModule,
		AsyncPipe,
		NgbTypeaheadModule,
		NgbdSortableHeader,
		NgbPaginationModule,
		NgIf,
	],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [TodosserviceService, DecimalPipe],
})
export class TablesComponent implements OnInit {

  todosarray: any[] = [] as any[];
  todos$: Observable<ISalesMaster[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: TodosserviceService, private _salesService: SalesentryserviceService) {
    this.todos$ = service.salesentries$;
    this.total$ = service.total$;
    
  }

  ngOnInit(): void {
    alert("success");
    //console.log(this.todos$)
    console.log(this.todos$)
    // this._salesService.getAllTodos().subscribe(data => {
    //   this.todosarray = data?.users;
      
   // })
   
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
