import axiosInstance from "@/axiosInstance";
import axiosErrorManager from "@/utils/axiosErrorManager";
import {create} from "zustand"

interface budgetdata{
    category:string
    amount:number
}

export enum Category {
    FOOD = 'FOOD',
    TRANSPORT = 'TRANSPORT',
    HOUSING = 'HOUSING',
    UTILITIES = 'UTILITIES',
    ENTERTAINMENT = 'ENTERTAINMENT',
    SHOPPING = 'SHOPPING',
    HEALTHCARE = 'HEALTHCARE',
    PERSONAL = 'PERSONAL',
    EDUCATION = 'EDUCATION',
    OTHER = 'OTHER'
  }

export interface User {
    _id: string;
    name: string;
    email: string;
  }
  
  export interface Budget {
    _id: string;
    userId: User;
    category: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  interface BudgetState{
    budget:Budget[]|null
    budgetById:Budget|null
    error: string | null;
    loading: boolean;
    createBudget:(budgetData:budgetdata)=>Promise<string|void>
    getallBudget:()=>Promise<void>
    getBudgetById:(id:string)=>Promise<void>
    EditBudget:(budgetData:budgetdata,id:string)=>Promise<string|void>

}
export const useBudget=create<BudgetState>((set)=>({
budget:null,
budgetById:null,
error:null,
loading:false,
createBudget:async(budgetData:budgetdata)=>{
    try {
        set({loading:true,error:null})
       await axiosInstance.post("/addbudget",budgetData)
       set({loading:false,error:null})

    } catch (error) {
        const message=axiosErrorManager(error)
        set({loading:false,error:message})

    }
},
getallBudget:async()=>{
try {
    set({loading:true,error:null})

    const response=await axiosInstance.get("/getallbudget")
    set({loading:false,error:null,budget:response.data.data})

} catch (error) {
   const message= axiosErrorManager(error)
   set({loading:false,error:message})

}
},
getBudgetById:async(id:string)=>{
    try {
        set({loading:true,error:null})
    
        const response=await axiosInstance.get(`/getallbudget/${id}`)
        set({loading:false,error:null,budgetById:response.data.data})
    
    } catch (error) {
       const message= axiosErrorManager(error)
       set({loading:false,error:message})
    
    }
    },
    EditBudget:async(budgetData:budgetdata,id:string)=>{
        try {
            set({loading:true,error:null})
           await axiosInstance.put(`/updatebudget/${id}`,budgetData)
           set({loading:false,error:null})
    
        } catch (error) {
            const message=axiosErrorManager(error)
            set({loading:false,error:message})
    
        }
    },
}))