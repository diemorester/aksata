import { createToken } from '@/helpers/createToken';
import prisma from '@/prisma';
import {
  forgotPasswordService,
  loginUserService,
  RegisterUserService,
  resetPasswordService,
  verifyUserService,
} from '@/services/auth/user.service';
import { NextFunction, request, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class UserController {
  async RegisterUser(
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

  async LoginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await loginUserService(req.body);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Login succeeded',
        user,
        accessToken,
        refreshToken
      });
    } catch (error) {
      next(error)
    }
  }

  async RefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(400).send({
          status: 'error',
          msg: 'no refresh token provided',
        });
      }
      
      const decoded = verify(refreshToken, process.env.SECRET_KEY || 'real madrid') as { email: string }

      const user = await prisma.user.findFirst({
        where: { email: decoded.email },
      });

      if (!user) {
        return res.status(400).send({
          status: 'error',
          msg: 'user not found',
        });
      }

      const payload = {
        id: user.id,
        role: user.role,
        email: user.email
      };
      const newAccessToken = createToken(payload, '15m');

      return res.status(200).send({
        status: 'ok',
        msg: 'token refreshed',
        accessToken: newAccessToken
      })

    } catch (error) {
      next(error)
    }
  }

  async ForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await forgotPasswordService(req.body.email);
      return res.status(200).send({
        status: 'ok',
        msg: 'reset email has been sent! please check your email'
      })
    } catch (error) {
      next(error)
    }
  }

  async ResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await resetPasswordService(req.body.password, req.user?.email!);
      return res.status(200).send({
        status: 'ok',
        msg: 'your password has been reset'
      })      
    } catch (error) {
      next(error)
    }
  }
}