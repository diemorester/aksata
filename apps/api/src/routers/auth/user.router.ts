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
    this.router.post('/refresh-token',
      refreshTokenMiddleware,
      this.userController.RefreshToken
    );
    this.router.post('/reset-password',
      authMiddleware,
      this.userController.ResetPassword
    );
    this.router.patch(
      '/verify',
      authMiddleware,
      this.userController.VerifyUserController
    );
    this.router.patch('/edit-user',
      authMiddleware,
      uploader('avatar', '/avatar').single('avatar'),
      this.userController.EditUser
    );
    this.router.get('/remove-phone',
      authMiddleware,
      this.userController.RemovePhone
    )
  }

  getRouter(): Router {
    return this.router;
  }
}