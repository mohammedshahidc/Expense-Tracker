import { Response, Request, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { User } from "../Models/UserSchema";
import jwt from 'jsonwebtoken'
import CustomError from "../Utils/CustomError";

export const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body
    console.log('dshfcsdu', name, email, password);

    const hashedpassword = await bcrypt.hash(password, 10)
    const newuser = new User({ name, email, password: hashedpassword })
    await newuser.save()
    const accesstoken = jwt.sign({ id: newuser._id, email: newuser.email }, process.env.JWT_SECRET || "dfhusjf5646", { expiresIn: '1h' })
    const refreshToken = jwt.sign({ id: newuser._id, email: newuser.email }, process.env.JWT_SECRET || "dfhusjf5646", { expiresIn: '7d' })
    res.cookie('accessToken', accesstoken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ error: false, message: "User registered successfully", data: { accesstoken: accesstoken, refreshToken: refreshToken, user: newuser } })
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    console.log("jhdfuy", email, password);

    if (!email || !password) {
        return next(new CustomError("all feiled are required",404))
    }
    const user = await User.findOne({ email: email })
    if (!user) {
        return next(new CustomError("user not found",404))
    }
    const isPasswordValid = await bcrypt.compare(password, user?.password)
    if (!isPasswordValid) {
        return next(new CustomError("invalid email or password",404))
    }
    const accesstoken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "dfhusjf5646", { expiresIn: '1h' })
    const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "dfhusjf5646", { expiresIn: '7d' })
    res.cookie('accessToken', accesstoken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge:60*60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ error: false, message: "user logined successfully", data: { accesstoken: accesstoken, refreshToken: refreshToken, user: user } })
}