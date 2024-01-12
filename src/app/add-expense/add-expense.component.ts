import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Transaction } from './../transaction';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {

  dateValue: string = new Date().toISOString().split('T')[0];
  editMode: boolean = false;
  id: number = 0;
  descricaoValue: string = "";
  valorValue: number = 0;
  currentMonth: string = "";
  month : string[] = ["january","February","March","April","May","June","July","August","September","October","November","December"];

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) {
    const d = new Date();
    let name = this.month[d.getMonth()];
    this.currentMonth = name;
  }

  ngOnInit(): void {
    this.descricaoValue = this.route.snapshot.paramMap.get('descricaoValue') || "";
    this.dateValue = this.route.snapshot.paramMap.get('dateValue') != null ? new Date(Number(this.route.snapshot.paramMap.get('dateValue'))).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    this.valorValue = Number(this.route.snapshot.paramMap.get('valorValue')) || 0;
    this.editMode = (/true/i).test(this.route.snapshot.paramMap.get('editMode') || "");
    this.id = Number(this.route.snapshot.paramMap.get('id'));

  }

  addExpense() {
    let transaction: Transaction = { date: new Date(this.dateValue).getTime().toString(), description: this.descricaoValue, value: this.valorValue, month: this.currentMonth, id: this.id}
    console.log(transaction);
    if(this.editMode === false){
      this.httpService.postTransaction(transaction).subscribe(data => console.log(data));
    }else{
      this.httpService.putTransaction(transaction).subscribe(data => console.log(data));
    }
    this.router.navigate(['/'])
  }

}
