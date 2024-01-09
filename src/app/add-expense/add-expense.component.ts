import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Transaction } from './../transaction';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {

  dateValue: Date = new Date();
  descricaoValue: string = "";
  valorValue: number = 0;
  currentMonth: string = "";
  month : string[] = ["january","February","March","April","May","June","July","August","September","October","November","December"];

  constructor(private httpService: HttpService, private router: Router) {
    const d = new Date();
    let name = this.month[d.getMonth()];
    this.currentMonth = name;
  }

  addExpense() {
    let transaction: Transaction = { date: new Date(this.dateValue).getTime(), description: this.descricaoValue, value: this.valorValue }
    this.httpService.postTransaction(this.currentMonth, transaction).subscribe(data => console.log(data));
    this.router.navigate(['/'])
  }

}
