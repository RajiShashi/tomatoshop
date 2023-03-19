import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesentryserviceService {

  private _url = "http://localhost:3000/customerlist";
  private _geturl = "http://localhost:3000/customer";
  private _salesurl = "http://localhost:3000/salesmaster";
  private _todos = "https://dummyjson.com/todos";
  private _productUrl = "http://localhost:3000/productlist";
  private _salesdetailUrl = "http://localhost:3000/getreports/outward";
  private _purchaseUrl ="http://localhost:3000/getreports/inward";
  private _salesUrl = "http://localhost:3000/getreports/outward";

  
  constructor(private _httpClient: HttpClient) { }

  getAllTodos(): Observable<any> {
    return this._httpClient.get<any>(this._todos);
  }

  getAllCustomer(): Observable<any>{
    return this._httpClient.get<any>(this._url);
  }
  
  saveCustomer(customer: any): Observable<any> {
    return this._httpClient.post(this._url, customer);
  }

  getCustomer(id: number): Observable<any> {
    return this._httpClient.get<any>(this._geturl + "/" + id)
  }

  updateCustomer(customer: any, id: number): Observable<any> {
    return this._httpClient.put(this._geturl + "/" + id, customer);
  }

  saveSalesentry(sales: any): Observable<any> {
    return this._httpClient.post(this._salesurl, sales);
  }

  getReportDetails(sales: any): Observable<any> {
    return this._httpClient.post(this._salesurl, sales);
  }

  getBillno(id: number): Observable<any> {
    return this._httpClient.get<any>(this._salesurl + "/" + id)
  }

  getProductList(): Observable<any> {
    return this._httpClient.get<any>(this._productUrl)
  }

  getPurchaseDetail(id: number): Observable<any> {
    return this._httpClient.get<any>(this._salesurl + "/" + id)
  }

  getSalesDetail(val:any): Observable<any> {
    if(val && val != '') {
      return this._httpClient.get<any>(this._salesdetailUrl + "?" + val)  
    } else {
      return this._httpClient.get<any>(this._salesdetailUrl )
    }
  }

  
  getAllInwardDetails(): Observable<any> {
    return this._httpClient.get<any>(this._purchaseUrl)
  }

  // getAllInwardDetails(): Observable<any> {
  //   return this._httpClient.get<any>(this._todos)
  // }


}
