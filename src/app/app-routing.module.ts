import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { CurrentMonthComponent } from './current-month/current-month.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddBalanceComponent } from './add-balance/add-balance.component';

const routes: Routes = [
  { path: '', component: CurrentMonthComponent },
  { path: 'addExpense', component: AddExpenseComponent },
  { path: 'addIncome', component: AddIncomeComponent},
  { path: 'addBalance', component: AddBalanceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
