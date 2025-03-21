import { Request, Response, NextFunction } from 'express'
import { Budget } from '../Models/budgesSchema'
import CustomError from '../Utils/CustomError'


export const addBudget = async (req: Request, res: Response, next: NextFunction) => {
    const { amount, category } = req.body
    const id = req.user?.id
    const newbudget = new Budget({ amount, category, userId: id })
    await newbudget.save()
    res.status(200).json({ error: false, message: "Budget added successfully", data: newbudget })
}

export const getAllBudget = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user?.id
    const allBudget = await Budget.find({ userId: user }).populate("userId", "name email")
    if (!allBudget) {
        return next(new CustomError("Budget not available",404))

    }
    res.status(200).json({ error: false, message: "all Budget ", data: allBudget })
}

export const getBudgetById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const budgetById = await Budget.findById(id)
    if (!budgetById) {
        return next(new CustomError("Budget not available",404))

    }
    res.status(200).json({ error: false, message: "budget by id", data: budgetById })
}

export const updateBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { amount, category } = req.body;
    const { id } = req.params;

    const updatedBudget = await Budget.findByIdAndUpdate(
        id,
        { amount, category },
        { new: true }
    );

    if (!updatedBudget) {
        return next(new CustomError("Failed To Update Budget",404));
    }

    res.status(200).json({
        error: false,
        message: "Budget updated successfully",
        data: updatedBudget
    });
};

export const deleteBudget = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const deletedBudget = await Budget.findByIdAndDelete(id)
    res.status(200).json({ error: false, message: "Budget deleted successfully", data: deletedBudget })
}