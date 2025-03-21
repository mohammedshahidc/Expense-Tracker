import mongoose from 'mongoose'
import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv';
import userRoutes from './Routes/UserRoutes';
import errorHandler from './Middlewares/ErrorHandler';
import CustomError from './Utils/CustomError';
import cookieParser from 'cookie-parser'


dotenv.config();
const server = express()
const PORT = process.env.PORT
server.use(cookieParser());

if (!process.env.MONGOOSECONNECTION) {
    throw new Error("MONGO_URI is not defined in environment variables");
}
mongoose.connect(process.env.MONGOOSECONNECTION)
    .then(() => {
        console.log("db connected successfully");

    })
    .catch((err) => {
        console.log("errpr:", err);

    })

    server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.use("/api/user", userRoutes)


server.use(errorHandler)

server.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new CustomError(`cannot ${req.method} ${req.originalUrl}`, 404)
    next(err)
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});