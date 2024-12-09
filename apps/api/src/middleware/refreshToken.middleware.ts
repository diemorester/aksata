import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const refreshToken = req.cookies.refreshToken;
       
       if (!refreshToken) {
        return res.status(401).send({
            status: 'error',
            msg: 'no refresh token provided',
        });
       }

       const decoded = verify(refreshToken, process.env.SECRET_KEY || 'real madrid') as { email: string };

       const user = await prisma.user.findFirst({
        where: { email: decoded.email },
       });

       if (!user) {
        return res.status(401).send({
            status: 'error',
            msg: 'user not found',
        });
       }

       req.user = user;

       next()
    } catch (error) {
        res.status(400).send({
            status: 'ERROR MIDDLEWARE',
            msg: error,
          });
    }
}