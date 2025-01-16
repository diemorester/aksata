import { PengajuanController } from "@/controllers/pengajuan/pengajuan.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class PengajuanRouter {
    private router: Router;
    private pengajuanController: PengajuanController;

    constructor() {
        this.pengajuanController = new PengajuanController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', authMiddleware, this.pengajuanController.pengajuan);
        this.router.get('/get-pengajuan-by-user-id', authMiddleware, this.pengajuanController.pengajuanUser);
        this.router.get('/get-pengajuan-by-HR', authMiddleware, this.pengajuanController.pengajuanHR);
        this.router.patch('/approve-pengajuan/:absensiId', authMiddleware, this.pengajuanController.approvePengajuan);
        this.router.patch('/decline-pengajuan/:absensiId', authMiddleware, this.pengajuanController.declinePengajuan);
    }

    getRouter(): Router {
        return this.router
    };
};