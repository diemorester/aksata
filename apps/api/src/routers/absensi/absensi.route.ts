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
    this.router.get('/export-excel', this.absensiController.exportExcel);
    this.router.get('/attendance',
      authMiddleware,
      this.absensiController.getUserAttendance
    );
    this.router.get(
      '/attendances',
      this.absensiController.getAllAttendance
    );
    this.router.get(
      '/attendance-by-id',
      authMiddleware,
      this.absensiController.getAttendanceById
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
