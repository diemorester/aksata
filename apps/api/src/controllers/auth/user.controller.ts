import {
  RegisterUserService,
  verifyUserService,
} from '@/services/auth/user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async RegisterUserController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = await RegisterUserService(req.body);
      return res.status(200).send({
        msg: 'User created, please check your email for verification',
        token,
      });
      
    } catch (error) {
      next(error);
    }
  }

  async VerifyUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const updateUser = await verifyUserService(req.user?.id!);
      return res.status(200).send({
        msg: 'User verified',
        updateUser,
      });

    } catch (error) {
      next(error);
    }
  }
}
