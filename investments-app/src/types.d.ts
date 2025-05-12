export interface Product {
    clientId: string;
    currency: string;
    type: 'investment' | 'pension_savings' | string;
    iban: string;
    debit: {
      amount: number;
      frequency: 'monthly' | 'weekly' | 'yearly' | string;
    };
    value: number;
  }
  