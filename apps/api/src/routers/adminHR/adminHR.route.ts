import { PengajuanLemburPerdinController } from '@/controllers/adminHR/adminHR.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { Router } from 'express';

export class AdminHRRouter {
    private router: Router;
    private pengajuanLemburPerdin: PengajuanLemburPerdinController;

    constructor() {
        this.pengajuanLemburPerdin = new PengajuanLemburPerdinController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/users', this.pengajuanLemburPerdin.getAllUser);
        this.router.get('/:userId', this.pengajuanLemburPerdin.getPengajuanByUserId);
    }

    getRouter(): Router {
        return this.router;
    }
}
