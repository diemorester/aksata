import { pengajuanService } from "@/services/pengajuan/pengajuan.service";
import { NextFunction, Request, Response } from "express";

export class PengajuanController {
    async pengajuan(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await pengajuanService(req.body, req.user?.id!)
            return res.status(200).send({
                status: 'ok',
                msg: 'pengajuan berhasil',
                response
            })
        } catch (error) {
            next(error);
        };
    };
}