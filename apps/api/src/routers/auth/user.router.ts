import { UserController } from '@/controllers/auth/user.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { refreshTokenMiddleware } from '@/middleware/refreshToken.middleware';
import { uploader } from '@/services/uploader';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.userController.RegisterUser);
    this.router.post('/login', this.userController.LoginUser);
    this.router.post('/forgot-password', this.userController.ForgotPassword);
    this.router.post(
      '/refresh-token',
      refreshTokenMiddleware,
      this.userController.RefreshToken,
    );
    this.router.post(
      '/reset-password',
      authMiddleware,
      this.userController.ResetPassword,
    );
    this.router.post(
      '/send-otp',
      authMiddleware,
      this.userController.sendVerificationMail,
    );
    this.router.post(
      '/verification-otp',
      authMiddleware,
      this.userController.verificationOtp,
    );
    this.router.patch(
      '/change-email',
      authMiddleware,
      this.userController.changeEmail,
    );
    this.router.patch(
      '/verify',
      authMiddleware,
      this.userController.VerifyUserController,
    );
    this.router.patch(
      '/edit-user',
      authMiddleware,
      uploader('avatar', '/avatar').single('avatar'),
      this.userController.EditUser,
    );
    this.router.patch(
      '/change-password',
      authMiddleware,
      this.userController.changePassword,
    );
    this.router.get(
      '/remove-phone',
      authMiddleware,
      this.userController.RemovePhone,
    );
    this.router.get(
      '/remove-avatar',
      authMiddleware,
      this.userController.RemoveAvatar,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
