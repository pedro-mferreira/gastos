import { Income } from './../income';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { HttpService } from '../http.service';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';





@Component({
  selector: 'app-current-month',
  templateUrl: './current-month.component.html',
  styleUrls: ['./current-month.component.css']
})
export class CurrentMonthComponent implements OnInit {


  currentMonth: string = "Janeiro"
  month: string[] = ["january", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  transactions: Transaction[] = [];

  totalSpentThisMonth: number = 0;
  totalSpentThisMonthPercentageOfTotalSalary: string = "";
  totalSalary: number = 0;
  salary: number = 918;
  mealAllowance: number = 0;



  constructor(private httpService: HttpService) {

  }

  ngOnInit() {
    const d = new Date();
    let name = this.month[d.getMonth()];
    this.currentMonth = name;

    this.httpService.getTransactions(this.currentMonth).pipe(
      switchMap((transactions) => {
        this.transactions = transactions;
        this.transactions.forEach((elem) => {
          this.totalSpentThisMonth += Number(elem.value);
        });
        return forkJoin([
          this.httpService.getIncome(this.currentMonth, "salary"),
          this.httpService.getIncome(this.currentMonth, "mealAllowance")
        ]);
      })
    ).subscribe(([salaryResponse, mealAllowanceResponse]) => {
      this.salary = Number(salaryResponse.value);
      this.mealAllowance = Number(mealAllowanceResponse.value);
      this.totalSalary = this.salary + this.mealAllowance;
      this.totalSpentThisMonthPercentageOfTotalSalary = (this.totalSpentThisMonth / this.totalSalary * 100).toFixed(2);
      this.transactions.sort((a, b) => a.date - b.date);
    });
  }

  updateTotals() {
    forkJoin([
      this.httpService.getIncome(this.currentMonth, "salary"),
      this.httpService.getIncome(this.currentMonth, "mealAllowance")
    ]).subscribe(([salaryResponse, mealAllowanceResponse]) => {
      this.salary = Number(salaryResponse.value);
      this.mealAllowance = Number(mealAllowanceResponse.value);
      this.totalSalary = this.salary + this.mealAllowance;
      this.totalSpentThisMonthPercentageOfTotalSalary = (this.totalSpentThisMonth / this.totalSalary * 100).toFixed(2);
    })
  }

  getDate(number: number): number {
    return new Date(number).getDate();
  }

  changeMealAllowance(newValue: string) {
    this.mealAllowance = Number(newValue);
    let income = {
      description: "mealAllowance",
      month: this.currentMonth,
      value: Number(newValue)
    }
    this.httpService.postIncome(income).subscribe((response) => {
      console.log(response);
    });
    this.updateTotals()
  }

  changeSalary(newValue: string) {
    this.salary = Number(newValue);
    let income = {
      description: "salary",
      month: this.currentMonth,
      value: Number(newValue)
    }
    this.httpService.postIncome(income).subscribe((response) => {
      console.log(response);
    });
    this.updateTotals()
  }

  resetSalary(): void {
    this.salary = 0;
  }

  resetMealAllowance(): void {
    this.mealAllowance = 0;
  }

}
