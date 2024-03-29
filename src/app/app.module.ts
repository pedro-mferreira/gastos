import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentMonthComponent } from './current-month/current-month.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from  '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentMonthComponent,
    AddExpenseComponent,
    AddIncomeComponent,
    AddBalanceComponent,
    ExpensesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    HttpClientModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
