import { IncomeCategory, ExpenseCategory } from '../hooks/useTransaction';
import * as Yup from 'yup';

export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export const registrationValidationSchema: Yup.ObjectSchema<RegistrationFormValues> = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms')
    .required('Required')
});



export interface TransactionFormValues {
  amount: number | null;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description: string;
}

export const transactionValidationSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive'),

  type: Yup.string()
    .required('Transaction type is required')
    .oneOf(['income', 'expense'], 'Type must be either income or expense'),

  category: Yup.string()
    .required('Category is required')
    .test('is-valid-category', 'Invalid category', function (value) {
      const { type } = this.parent;

      let validCategories: string[] = [];
      if (type === 'income') {
        validCategories = Object.values(IncomeCategory);
      } else if (type === 'expense') {
        validCategories = Object.values(ExpenseCategory);
      }
      return validCategories.includes(value || '');
    }),

  date: Yup.string()
    .required('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),

  description: Yup.string()
    .max(200, 'Description must be less than 200 characters')
    .optional(),
});
