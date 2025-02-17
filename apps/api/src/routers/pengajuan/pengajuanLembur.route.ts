import { PengajuanLemburPerdinController } from '@/controllers/pengajuan/pengajuanLembur.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { Router } from 'express';

export class PengajuanLemburPerdinRouter {
    private router: Router;
    private pengajuanLemburPerdin: PengajuanLemburPerdinController;

    constructor() {
        this.pengajuanLemburPerdin = new PengajuanLemburPerdinController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/all-pengajuan', this.pengajuanLemburPerdin.getAllPengajuanLembur);
        this.router.get('/users', this.pengajuanLemburPerdin.getAllUser);
        this.router.get('/:userId', this.pengajuanLemburPerdin.getPengajuanLemburPerdinByUserId);
        this.router.post('/ajukan', authMiddleware, this.pengajuanLemburPerdin.pengajuanLemburPerdin);;
        this.router.patch('/approve-pengajuan/:pengajuanId', this.pengajuanLemburPerdin.approvePengajuanLemburPerdin);
        this.router.patch('/decline-pengajuan/:pengajuanId', this.pengajuanLemburPerdin.declinePengajuanLemburPerdin);
    }

    getRouter(): Router {
        return this.router;
    }
}