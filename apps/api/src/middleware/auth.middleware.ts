import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw 'Token empty';
    
    const verifyUser = verify(token, process.env.SECRET_KEY!);
    req.user = verifyUser as User;

    next();
  } catch (error) {
    res.status(400).send({
      status: 'ERROR MIDDLEWARE',
      msg: error,
    });
  }
};
