import { Balance } from './../balance';
import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrl: './add-balance.component.css'
})
export class AddBalanceComponent {
  descricaoValue: string = ""; 
  valorValue: number = 0;
  currentMonth: string = "";
  month : string[] = ["january","February","March","April","May","June","July","August","September","October","November","December"];

  constructor(private httpService: HttpService, private router: Router) {
    const d = new Date();
    let name = this.month[d.getMonth()];
    this.currentMonth = name;
  }

  addBalance() {
    let balance: Balance = { description: this.descricaoValue, value: this.valorValue, month: this.currentMonth }
    this.httpService.postBalance(balance).subscribe(data => console.log(data));
    this.router.navigate(['/'])
  }
}
