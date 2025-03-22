import axiosInstance from "@/axiosInstance";
import axiosErrorManager from "@/utils/axiosErrorManager";
import { create } from "zustand"

interface budgetdata {
    category: string
    amount: number
}

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
    PERSONAL= 'PERSONAL',
    EDUCATION= 'EDUCATION',
    Others = 'Others',
}

export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface Budget {
    id: Key | null | undefined;
    _id: string;
    userId: User;
    category: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface BudgetState {
    budget: Budget[] | null
    budgetById: Budget | null
    error: string | null;
    loading: boolean;
    createBudget: (budgetData: budgetdata) => Promise<string | void>
    getallBudget: () => Promise<void>
    getBudgetById: (id: string) => Promise<void>
    EditBudget: (budgetData: budgetdata, id: string) => Promise<string | void>
    deleteBudget: (id: string) => Promise<void>

}
export const useBudget = create<BudgetState>((set) => ({
    budget: null,
    budgetById: null,
    error: null,
    loading: false,
    createBudget: async (budgetData: budgetdata) => {
        try {
            set({ loading: true, error: null })
            await axiosInstance.post("/addbudget", budgetData)
            set({ loading: false, error: null })

        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    },
    getallBudget: async () => {
        try {
            set({ loading: true, error: null })

            const response = await axiosInstance.get("/getallbudget")
            set({ loading: false, error: null, budget: response.data.data })

        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    },
    getBudgetById: async (id: string) => {
        try {
            set({ loading: true, error: null })

            const response = await axiosInstance.get(`/budgetbyid/${id}`)
            set({ loading: false, error: null, budgetById: response.data.data })

        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    },
    EditBudget: async (budgetData: budgetdata, id: string) => {
        try {
            set({ loading: true, error: null })
            await axiosInstance.put(`/updatebudget/${id}`, budgetData)
            set({ loading: false, error: null })

        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    },
    deleteBudget: async (id: string) => {
        try {
            set({ loading: true, error: null })
            await axiosInstance.delete(`/deletebudget/${id}`)
            set({ loading: false, error: null })

        } catch (error) {
            const message=(axiosErrorManager(error))
            set({ loading: false, error: message })

        }
    }
}))