import { Income } from './../income';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { HttpService } from '../http.service';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Balance } from '../balance';
import { Router } from '@angular/router';






@Component({
  selector: 'app-current-month',
  templateUrl: './current-month.component.html',
  styleUrls: ['./current-month.component.css'],
})
export class CurrentMonthComponent implements OnInit {

  daysInMonth: number[] = Array.from({ length: 31 }, (_, index) => index + 1);
  currentMonth: string = "Janeiro"
  month: string[] = ["january", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  transactions: Transaction[] = [];
  incomes: Income[] = [];
  balances: Balance[] = [];

  totalSpentThisMonth: number = 0;
  totalSpentThisMonthPercentageOfTotalSalary: string = "";
  totalEarned: number = 0;
  totalSalary: number = 0;
  salary: number = 918;
  mealAllowance: number = 0;



  constructor(private httpService: HttpService, private router: Router) {

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
          this.httpService.getIncomes(this.currentMonth),
          this.httpService.getBalances(this.currentMonth)
        ]);
      })
    ).subscribe(([incomesResponse, balancesResponse]) => {
      this.balances = balancesResponse;
      this.incomes = incomesResponse;
      this.incomes.forEach(income => {
        this.totalEarned+= Number(income.value);
      })
      this.salary = Number(this.incomes.find(obj => obj.description === "salary")?.value);
      this.mealAllowance = Number(this.incomes.find(obj => obj.description === "mealAllowance")?.value);
      this.incomes = this.incomes.filter(obj => obj.description !== "salary" && obj.description !== "mealAllowance");
      this.totalSalary = this.salary + this.mealAllowance;
      this.totalSpentThisMonthPercentageOfTotalSalary = (this.totalSpentThisMonth / this.totalSalary * 100).toFixed(2);
      this.transactions.sort((a, b) => Number(a.date) - Number(b.date));
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

  getDate(date: string): number {
    return new Date(Number(date)).getDate();
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
      this.updateTotals()
    });
    
  }

  resetSalary(): void {
    this.salary = 0;
  }

  resetMealAllowance(): void {
    this.mealAllowance = 0;
  }

  navigateToAddExpense(transaction: Transaction) {
    this.router.navigate(['/addExpense',  {descricaoValue: transaction.description, dateValue: transaction.date, valorValue: transaction.value, editMode: true, id: transaction.id}  ]);
  }

}
