import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
    const authHeader = request.headers.authorization;
    if(!authHeader){
        throw new AppError('JWT token is missing');
    }
    
    const [, token] = authHeader.split(' ');
    const { secret } = authConfig.jwt; 

    try{
        const decoded = verify(token, secret);
        
        const { sub } = decoded as ITokenPayload;

        request.user = { //sobrescrevi o request do Express adicionando user para ter disponível o id em todas as rotas
            id: sub
        }

        return next();
    }catch {
        throw new AppError("Invalid JWT token")
    }
}
