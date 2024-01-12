import { Component } from '@angular/core';
import { Income } from '../income';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.css'
})
export class AddIncomeComponent {
  descricaoValue: string = ""; 
  valorValue: number = 0;
  currentMonth: string = "";
  month : string[] = ["january","February","March","April","May","June","July","August","September","October","November","December"];

  constructor(private httpService: HttpService, private router: Router) {
    const d = new Date();
    let name = this.month[d.getMonth()];
    this.currentMonth = name;
  }

  addIncome() {
    let income: Income = { description: this.descricaoValue, value: this.valorValue, month: this.currentMonth }
    this.httpService.postIncome(income).subscribe(data => console.log(data));
    this.router.navigate(['/'])
  }
}
