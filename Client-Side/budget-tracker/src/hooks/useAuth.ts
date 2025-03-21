import axiosInstance from '@/axiosInstance'
import axiosErrorManager from '@/utils/axiosErrorManager'
import { create } from 'zustand'
import Cookies from 'js-cookie'
interface user {
    name: string
    email: string
    password: string
}
interface loginDt{
    email:string
    password:string
}
interface AuthState {
    user: user | null;
    error: string | null;
    loading: boolean;
    registerUser: (user: user) => Promise<string | void>;
    loginuser:(logindt:loginDt)=>Promise<string|void>
}



export const useAuth = create<AuthState>((set) => ({
    user: null,
    error: null,
    loading: false,
    registerUser: async (user) => {
        try {
          set({ loading: true, error: null });
          const response = await axiosInstance.post('/register', user);
          Cookies.set("accessToken",response.data.data.accesstoken)
          Cookies.set("refreshToken",response.data.data.refreshToken)
          set({ user: response.data.data, loading: false }); 
          return "Registration Successful";
        } catch (err) {
          const errorMessage = axiosErrorManager(err);
          console.error(errorMessage);
          set({ error: errorMessage, loading: false }); 
          return errorMessage;
        }
    },
    loginuser:async(logindt)=>{
        try {
            set({loading:true,error:null})
           const response= await axiosInstance.post("/login",logindt)
            Cookies.set("accessToken",response.data.data.accesstoken)
          Cookies.set("refreshToken",response.data.data.refreshToken)
            set({loading:false})
        } catch (error) {
            const errorMessage=axiosErrorManager(error)
            set({error:errorMessage,loading:false})
        }
    }
}));