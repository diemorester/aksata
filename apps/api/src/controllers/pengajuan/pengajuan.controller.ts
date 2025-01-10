import { getPengajuanHRService, getPengajuanUserService, pengajuanService } from "@/services/pengajuan/pengajuan.service";
import { NextFunction, Request, Response } from "express";

export class PengajuanController {
    async pengajuan(req: Request, res: Response, next: NextFunction) {
        try {
            const { application, attendance } = await pengajuanService(req.body, req.body, req.user?.id!)
            return res.status(200).send({
                status: 'ok',
                msg: 'pengajuan berhasil',
                application,
                attendance
            })
        } catch (error) {
            next(error);
        };
    };

    async pengajuanUser(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await getPengajuanUserService(req.user?.id!)
            return res.status(200).send({
                status: 'ok',
                response
            })
        } catch (error) {
            next(error);
        };
    };

    async pengajuanHR(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await getPengajuanHRService()
            return res.status(200).send({
                status: 'ok',
                response
            })
        } catch (error) {
            next(error);
        };
    };
}