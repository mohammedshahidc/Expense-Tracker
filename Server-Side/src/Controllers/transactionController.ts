import CustomError from "../Utils/CustomError";
import { Transaction } from "../Models/transactionSchema";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const addTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { receipt, description, category, date, type, amount } = req.body
    const user = req.user?.id
    if(!user || !description || !category || !date || !type || !amount){
        return next(new CustomError("All feilds are required",404))
    }
    const newtransaction = new Transaction({ userId: user, amount, type, date, category, description, receipt })
    await newtransaction.save()
    res.status(200).json({ error: false, message: "Transaction added succefully", data: newtransaction })
}

export const getallTransactions=async(req:Request,res:Response,next:NextFunction)=>{
    const allTransactions= await Transaction.find()
    if(!allTransactions){
        return next(new CustomError("Transactions not found",404))
    }
    console.log('dfdrd',allTransactions);
    
    res.status(200).json({error:false,message:"All transaction",data:allTransactions})
}

export const getTransactionsById=async(req:Request,res:Response,next:NextFunction)=>{
    const{id}=req.params
    const transaction= await Transaction.findById(id)
    if(!transaction){
        return next(new CustomError("Transaction not found",404))
    }
        
    res.status(200).json({error:false,message:"transaction",data:transaction})
}

export const updateTransaction=async(req:Request,res:Response,next:NextFunction)=>{
    const { receipt, description, category, date, type, amount } = req.body
    const{id}=req.params
    const user = req.user?.id
    if(!user || !description || !category || !date || !type || !amount){
        return next(new CustomError("All feilds are required",404))
    }
    const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { userId: user, amount, type, date, category, description, receipt },
        { new: true }

    );

    res.status(200).json({error:false,message:"transaction updated successfully",data:updatedTransaction})

}

export const deletetransaction=async(req:Request,res:Response,next:NextFunction)=>{
    const{id}=req.params
    const deletedtransaction=await Transaction.findByIdAndDelete(id)
    res.status(200).json({error:false,message:"transaction deleted successfully",data:deletedtransaction})
}

export const getMonthlySummary = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id; 

    const summary = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { 
            month: { $substr: ["$date", 5, 2] }, 
            year: { $substr: ["$date", 0, 4] }  
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
  
    if (!summary) {
      return next(new CustomError('Failed to fetch monthly summary'));
    }
  
    res.status(200).json({error:false,message:"monthly summery",data:summary});
  };
  

  export const getCategorySummary = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const categorySummary = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, 
      {
        $group: {
          _id: "$category",
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
  
    if (!categorySummary) {
      return (new CustomError('Failed to fetch category summary'));
    }
  
    res.status(200).json({error:false,message:"category summary",data:categorySummary});
  };