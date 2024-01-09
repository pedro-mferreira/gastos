import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { CurrentMonthComponent } from './current-month/current-month.component';

const routes: Routes = [
  { path: '', component: CurrentMonthComponent },
  { path: 'addExpense', component: AddExpenseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
