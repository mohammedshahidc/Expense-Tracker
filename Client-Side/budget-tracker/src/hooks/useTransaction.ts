import axiosInstance from "@/axiosInstance";
import axiosErrorManager from "@/utils/axiosErrorManager";
import { create } from "zustand";
export type TransactionType = 'income' | 'expense';

export enum ExpenseCategory {
    Food = 'Food',
    Travel = 'Travel',
    Shopping = 'Shopping',
    Bills = 'Bills',
    Entertainment = 'Entertainment',
    Health = 'Health',
    Housing = 'Housing',
    Salary = 'Salary',
    Investment = 'Investment',
    PERSONAL= 'PERSONAL',
    EDUCATION= 'EDUCATION',
    Others = 'Others',
}

export enum IncomeCategory {
    Salary = 'Salary',
    Investment = 'Investment',
    Freelance = 'Freelance',
    Others = 'Others',
}

export interface Transactions {
    _id: string;
    userId: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    __v: number;
}
export interface Transaction {
    amount: number | 0;
    type: TransactionType;
    category: string;
    date: string;
    description: string;
}

interface TransactionSTate {
    transaction: Transactions[] | null
    transactionByid: Transactions | null
    error: string | null
    loading: boolean
    addTransaction: (transactionDt: Transaction) => Promise<string | void>
    getAllTransaction: () => Promise<void>
    getTransactionById: (id:string) => Promise<void>
    EditTransaction: (transactionDt: Transaction,id:string) => Promise<string | void>
    deleteTransaction:(id:string)=>Promise<void>
}

export const useTransaction = create<TransactionSTate>((set) => ({
    transaction: null,
    transactionByid: null,
    error: null,
    loading: false,
    addTransaction: async (transactionDt: Transaction) => {
        try {
            console.log('rr', transactionDt);

            set({ loading: true, error: null })
            await axiosInstance.post('/addtransaction', transactionDt)
            set({ loading: false, error: null })

        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    },
    getAllTransaction: async () => {
        try {
            set({ loading: true, error: null })

            const response = await axiosInstance.get("/getalltransactions")
            set({ loading: false, error: null, transaction: response.data.data })

        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    },
    getTransactionById: async (id:string) => {
        try {
            set({ loading: true, error: null })

            const response = await axiosInstance.get(`/gettransactionbyid/${id}`)
            set({ loading: false, error: null, transactionByid: response.data.data })

        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    },
    EditTransaction: async (transactionDt: Transaction,id:string) => {
        try {
            console.log('rr', transactionDt);

            set({ loading: true, error: null })
            await axiosInstance.put(`/updatetransaction/${id}`, transactionDt)
            set({ loading: false, error: null })

        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    },
    deleteTransaction:async(id:string)=>{
        try {
            set({ loading: true, error: null })

            await axiosInstance.delete(`/deletetrancation/${id}`)
            set({ loading: false, error: null })

        } catch (error) {
            const message=axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    }
}))

