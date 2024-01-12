import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Transaction } from './transaction';
import { Income } from './income';
import { Balance } from './balance';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:3000/transactions/';

  private urlIncome =  'http://localhost:3000/incomes/';

  private urlBalance = 'http://localhost:3000/balances/';

  constructor(private http: HttpClient) { }

  getTransactions(month: string) {
    return this.http.get<any>(this.url + month);
  }

  postTransaction(transaction: Transaction){
    return this.http.post<Transaction>(this.url, transaction);
  }

  postIncome(income: Income){
    return this.http.post<Income>(this.urlIncome, income)
  }

  getIncome(month: string, description: string){
    return this.http.get<Income>(this.urlIncome + `?description=${description}&month=${month}`)
  }

  getIncomes(month: string){
    return this.http.get<Income[]>(this.urlIncome + month)
  }

  getBalances(month: string){
    return this.http.get<Balance[]>(this.urlBalance + month)
  }

  postBalance(balance: Balance){
    return this.http.post<Balance>(this.urlBalance, balance)
  }

  putTransaction(transaction: Transaction){
    return this.http.put<Transaction>(this.url + transaction.id, transaction);
  }
}
