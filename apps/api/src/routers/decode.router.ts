import { DecodeController } from '@/controllers/decode.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { Router } from 'express';

export class DecodeRouter {
  private router: Router;
  private decodeController: DecodeController;

  constructor() {
    this.decodeController = new DecodeController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/decode', authMiddleware, this.decodeController.DecodeController);
  }

  getRouter(): Router {
    return this.router;
  }
}
