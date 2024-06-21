export class Transaction {
  transactionId: string;
  transactionDate: string;
  amount: number;
  description: string | null;
  vendor: string | null;
  reimbursable: boolean | null;

  constructor(
    transactionId: string,
    transactionDate: string,
    amount: number,
    description: string | null = null,
    vendor: string | null = null,
    reimbursable: boolean | null = null
  ) {
    this.transactionId = transactionId;
    this.transactionDate = transactionDate;
    this.amount = amount;
    this.description = description;
    this.vendor = vendor;
    this.reimbursable = reimbursable;
  }
}
