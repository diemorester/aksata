import { AbsensiController } from '@/controllers/absensi/absensi.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { Router } from 'express';

export class AbsensiRouter {
  private router: Router;
  private absensiController: AbsensiController;

  constructor() {
    this.absensiController = new AbsensiController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/clock-in',
      authMiddleware,
      this.absensiController.clockIn,
    );
    this.router.post(
      '/clock-out',
      authMiddleware,
      this.absensiController.clockOut,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
