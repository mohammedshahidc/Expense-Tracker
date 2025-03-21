import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import CustomError from '../Utils/CustomError';

declare global {
    namespace Express {
        interface Request {
            user?: DecodedToken;
        }
    }
}

interface DecodedToken {
    id: string;
    email: string;
    role: string;
}

const userAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : null;
    const refreshToken = req.cookies?.refreshToken;

    const generateNewAccessToken = (decoded: DecodedToken) => {
        const newToken = jwt.sign(
            { id: decoded.id, email: decoded.email, role: decoded.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        res.cookie('accessToken', newToken, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000,
            sameSite: 'none',
        });
        req.user = decoded;
        next();
    };

    if (!token) {
        if (!refreshToken) {
            return next(new CustomError('Access token and refresh token are missing.', 401));
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as DecodedToken;
            generateNewAccessToken(decoded);
        } catch {
            return next(new CustomError('Invalid or expired refresh token.', 401));
        }
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
            req.user = decoded;
            next();
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                if (!refreshToken) {
                    return next(new CustomError('Access token expired and no refresh token provided.', 401));
                }

                try {
                    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as DecodedToken;
                    generateNewAccessToken(decoded);
                } catch {
                    return next(new CustomError('Invalid or expired refresh token.', 401));
                }
            } else {
                return next(new CustomError('Invalid access token.', 401));
            }
        }
    }
};

export { userAuth };
