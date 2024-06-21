import { Component } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit() {
    this.transactionService.getTransactions().subscribe({
      next: (response: Transaction[]) => {
        this.transactions = response;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
