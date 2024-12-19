import { AbsensiController } from '@/controllers/absensi/absensi.controller';
import { accessAdminHr, authMiddleware } from '@/middleware/auth.middleware';
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
    this.router.post('/export-excel', this.absensiController.exportExcel);
    this.router.get(
      '/getall-attendance',
      // authMiddleware,
      // accessAdminHr,
      this.absensiController.getAllAttendance,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
