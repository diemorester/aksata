import {
  changeEmailService,
  changePasswordService,
  editUserService,
  forgotPasswordService,
  loginUserService,
  RegisterUserService,
  removeAvatarService,
  removePhoneService,
  resetPasswordService,
  sendVerificationChangeMailService,
  verificationOtpService,
  verifyUserService,
} from '@/services/auth/user.service';
import { NextFunction, Request, Response } from 'express';

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
      const { user, accessToken } = await loginUserService(req.body);
      return res.status(200).send({
        status: 'ok',
        msg: 'Login succeeded',
        user,
        accessToken
      });
    } catch (error) {
      next(error)
    }
  }

  async ForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await forgotPasswordService(req.body.email);
      return res.status(200).send({
        status: 'ok',
        msg: 'Reset email has been sent! please check your email'
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
        msg: 'Your password has been reset'
      })
    } catch (error) {
      next(error)
    }
  };

  async EditUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await editUserService(req.body, req.user?.id!, req.file?.filename);
      return res.status(200).send({
        status: 'ok',
        msg: 'User has been edited',
        user
      })
    } catch (error) {
      next(error)
    }
  };

  async RemovePhone(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await removePhoneService(req.user?.id!);
      return res.status(200).send({
        status: 'ok',
        msg: 'Phone number has been removed',
        user
      })
    } catch (error) {
      next(error)
    }
  };

  async RemoveAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await removeAvatarService(req.user?.id!);
      return res.status(200).send({
        status: 'ok',
        msg: 'Avatar has been removed',
        user
      })
    } catch (error) {
      next(error)
    }
  };

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await changePasswordService(req.user?.id!, req.body.oldpass, req.body.newpass);
      return res.status(200).send({
        status: 'ok',
        msg: 'Password has been changed',
        user
      })
    } catch (error) {
      next(error)
    }
  };

  async sendVerificationMail(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await sendVerificationChangeMailService(req.user?.email!);
      return res.status(200).send({
        status: 'ok',
        msg: 'Email has been sent! please check your email',
        user
      })
    } catch (error) {
      next(error)
    }
  };

  async verificationOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await verificationOtpService(req.user?.email!, req.body.otp);
      return res.status(200).send({
        status: 'ok',
        msg: 'OTP is correct, please enter a new email',
        user
      })
    } catch (error) {
      next(error)
    }
  };

  async changeEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { newEmail, token } = await changeEmailService(req.user?.email!, req.body.email);
      return res.status(200).send({
        status: 'ok',
        msg: 'Email has been changed',
        newEmail,
        token
      })
    } catch (error) {
      next(error)
    }
  };
}