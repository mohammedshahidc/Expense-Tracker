import mongoose, { Document } from 'mongoose';

export enum Category {
  Food = 'Food',
  Travel = 'Travel',
  Shopping = 'Shopping',
  Bills = 'Bills',
  Entertainment = 'Entertainment',
  Health = 'Health',
  Housing = 'Housing',
  Salary = 'Salary',
  Investment = 'Investment',
  Others = 'Others',
}

export enum IncomeCategory {
  Salary = 'Salary',
  Investment = 'Investment',
  Freelance = 'Freelance',
  Others = 'Others',
}

export enum ExpenseCategory {
  Food = 'Food',
  Travel = 'Travel',
  Shopping = 'Shopping',
  Bills = 'Bills',
  Entertainment = 'Entertainment',
  Housing = 'Housing',
  Health = 'Health',
  Others = 'Others',
}

export interface TransactionType extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  type: 'income' | 'expense';
  category: Category;
  date: string;
  description?: string;
}

const transactionSchema = new mongoose.Schema<TransactionType>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { 
      type: String, 
      // enum: Object.values(Category), 
      required: true 
    },
    date: { type: String},
    description: { type: String },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model<TransactionType>('Transaction', transactionSchema);
