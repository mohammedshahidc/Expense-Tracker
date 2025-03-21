import {Request,Response,NextFunction} from 'express'

interface CustomError extends Error{
    statusCode?:number
    status:string
}

const errorHandler=(err:CustomError,req:Request,res:Response,next:NextFunction)=>{
    const statusCode=err.statusCode||500
    const message=err.message|| "Internal Server Error"
    const status=err.status||'error'

    res.status(statusCode).json({
        status,
        message,
        statusCode,
      });
}

export default errorHandler