import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ISalesMaster } from './salesentry/ISalesMaster';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';
import { SalesentryserviceService } from './salesentry/salesentryservice.service';
import { HttpClient } from '@angular/common/http';


interface SearchResult {
	salesentries: ISalesMaster[];
	total: number;
}

interface TodosInter {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(salesentries: ISalesMaster[], column: SortColumn, direction: string): ISalesMaster[] {
	if (direction === '' || column === '') {
		return salesentries;
	} else {
		return [...salesentries].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(todo: ISalesMaster, term: string, pipe: PipeTransform) {
	return (
		todo.firstName.toLowerCase().includes(term.toLowerCase()) ||
		pipe.transform(todo.height).includes(term) ||
		pipe.transform(todo.weight).includes(term)
	);
}


@Injectable({
	providedIn: 'root'
})
export class TodosserviceService {

	todosarray: any[] = [] as any[];

	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _salesentries$ = new BehaviorSubject<ISalesMaster[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

	private _todosInter: TodosInter = {
		page: 1,
		pageSize: 4,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(private _service: SalesentryserviceService, private pipe: DecimalPipe, private _httpClient: HttpClient) {
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result: any) => {
				this._salesentries$.next(result.salesentries);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

	getAllTodos() {
		this._service.getAllTodos().subscribe(data => {
			this.todosarray = data?.users;
			this.todosarray = JSON.parse(JSON.stringify(this.todosarray));
		})
	}

	get salesentries$() {
		return this._salesentries$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._todosInter.page;
	}
	get pageSize() {
		return this._todosInter.pageSize;
	}
	get searchTerm() {
		return this._todosInter.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<TodosInter>) {
		Object.assign(this._todosInter, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._todosInter;

		// 1. sort
		let salesentries = sort(this.todosarray, sortColumn, sortDirection);

		// 2. filter
		salesentries = salesentries.filter((country) => matches(country, searchTerm, this.pipe));
		const total = salesentries.length;

		// 3. paginate
		salesentries = salesentries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ salesentries, total });
	}

}
