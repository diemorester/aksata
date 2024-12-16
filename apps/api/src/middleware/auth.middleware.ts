import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace('Bearer ', '');
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

export const accessAdminHr = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace('Bearer ', '');
    const verifyUser = verify(token, process.env.SECRET_KEY!);
    req.user = verifyUser as User;

    if (req.user.role !== 'AdminHR' && req.user.role !== 'SuperAdmin')
      throw 'only Admin HR and SuperAdmin';

    next();
  } catch (error) {
    return res.status(400).send({
      status: 'ERROR ACCESS ROLE',
      msg: error,
    });
  }
};
