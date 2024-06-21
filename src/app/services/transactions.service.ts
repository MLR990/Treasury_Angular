import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL: string = `${environment.apiURL}/api/transactions`;

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  transactions: Transaction[] = [];

  constructor(private httpClient: HttpClient) {}

  public getTransactions(): Observable<Transaction[]> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      `Bearer ${localStorage['token']}`
    );

    return this.httpClient.get<Transaction[]>(API_URL, { headers: headers });
  }
}
