import { UserController } from '@/controllers/auth/user.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
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
    this.router.post('/register', this.userController.RegisterUserController);
    this.router.post('/login', this.userController.LoginUser);
    this.router.post('/forgot-password', this.userController.ForgotPassword)
    this.router.post('/reset-password',
      authMiddleware,
      this.userController.ResetPassword
    )
    this.router.patch(
      '/verify',
      authMiddleware,
      this.userController.VerifyUserController
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
