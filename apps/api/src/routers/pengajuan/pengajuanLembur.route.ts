import { PengajuanLemburPerdinController } from '@/controllers/pengajuan/pengajuanLembur.controller';
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
        this.router.get('/:userId', this.pengajuanLemburPerdin.getPengajuanByUserId);
        this.router.patch('/approve-pengajuan/:pengajuanId', this.pengajuanLemburPerdin.approvePengajuanLemburPerdin);
    }

    getRouter(): Router {
        return this.router;
    }
}