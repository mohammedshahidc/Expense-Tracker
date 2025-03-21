import express from 'express'
import tryCatch from '../Utils/tryCatch'
import { RegisterUser, userLogin } from '../Controllers/userController'
import { addBudget, deleteBudget, getAllBudget, getBudgetById, updateBudget } from '../Controllers/budgetSchema'
import { userAuth } from '../Middlewares/authMiddleware'
import { addTransaction, deletetransaction, getMonthlySummary, getTransactionsById, getallTransactions, updateTransaction } from '../Controllers/transactionController'

const userRoutes=express.Router()

userRoutes
.post('/register',tryCatch(RegisterUser))
.post("/login",tryCatch(userLogin))
.post('/addbudget',userAuth,tryCatch(addBudget))
.get("/getallbudget",userAuth,tryCatch(getAllBudget))
.get("/budgetbyid/:id",userAuth,tryCatch(getBudgetById))
.put("/updatebudget/:id",userAuth,tryCatch(updateBudget))
.delete("/deletebudget/:id",userAuth,tryCatch(deleteBudget))
.post("/addtransaction",userAuth,tryCatch(addTransaction))
.get("/getalltransactions",userAuth,tryCatch(getallTransactions))
.get("/gettransactionbyid/:id",userAuth,tryCatch(getTransactionsById))
.put("/updatetransaction/:id",userAuth,tryCatch(updateTransaction))
.delete("/deletetrancation/:id",userAuth,tryCatch(deletetransaction))
.get("/getmonthlysummery",userAuth,tryCatch(getMonthlySummary))

export default userRoutes