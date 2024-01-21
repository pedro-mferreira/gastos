import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.css'
})
export class ExpensesTableComponent {
  @Input() transactions : Transaction[] = []

  constructor(private router : Router){}

  getDate(date: string): number {
    return new Date(Number(date)).getDate();
  }

  navigateToAddExpense(transaction: Transaction) {
    this.router.navigate(['/addExpense',  {descricaoValue: transaction.description, dateValue: transaction.date, valorValue: transaction.value, editMode: true, id: transaction.id}  ]);
  }

}
