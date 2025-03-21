import mongoose, { Document } from 'mongoose';
import { Category } from './transactionSchema';



export interface BudgetType extends Document {
  userId: mongoose.Types.ObjectId;
  category: string;
  amount: number;
  
}

const budgetSchema = new mongoose.Schema<BudgetType>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  
},{timestamps:true});

export const Budget = mongoose.model<BudgetType>('Budget', budgetSchema);
