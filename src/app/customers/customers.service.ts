import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private _url = "http://localhost:3000/customerlist";

  constructor(private _httpClient: HttpClient) { }

  getAllCustomer(): Observable<any>{
    return this._httpClient.get<any>(this._url);
  }
}
