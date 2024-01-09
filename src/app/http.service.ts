import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Transaction } from './transaction';
import { Income } from './income';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:3000/transactions/';

  private urlIncome =  'http://localhost:3000/incomes';

  constructor(private http: HttpClient) { }

  getTransactions(month: string) {
    return this.http.get<any>(this.url + month);
  }

  postTransaction(month: string, transaction: Transaction){
    return this.http.post<Transaction>(this.url + month, transaction);
  }

  postIncome(income: Income){
    return this.http.post<Income>(this.urlIncome, income)
  }

  getIncome(month: string, description: string){
    return this.http.get<Income>(this.urlIncome + `?description=${description}&month=${month}`)
  }
}
