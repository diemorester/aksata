import { approvePengajuanRequestService, declinePengajuanRequestService, getPengajuanHRService, getPengajuanUserService, pengajuanService } from "@/services/pengajuan/pengajuan.service";
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
            const { page, take, search } = req.query;
            const { meta, pengajuanUser } = await getPengajuanUserService(req.user?.id!, {
                page: Number(page as string) || 1,
                take: Number(take as string) || 10,
                search: search as string,
            })
            return res.status(200).send({
                status: 'ok',
                meta,
                response: pengajuanUser
            })
        } catch (error) {
            next(error);
        };
    };

    async pengajuanHR(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, take, search } = req.query;
            const { meta, pengajuanHR } = await getPengajuanHRService(req.user?.id!, {
                page: Number(page as string) || 1,
                take: Number(take as string) || 10,
                search: search as string,
            })
            return res.status(200).send({
                status: 'ok',
                meta,
                response: pengajuanHR
            })
        } catch (error) {
            next(error);
        };
    };

    async approvePengajuan(req: Request, res: Response, next: NextFunction) {
        try {
            const { absensiId } = req.params
            const updatePengajuan = await approvePengajuanRequestService(absensiId)
            return res.status(200).send({
                status: 'ok',
                updatePengajuan
            })
        } catch (error) {
            next(error);
        };
    };

    async declinePengajuan(req: Request, res: Response, next: NextFunction) {
        try {
            const { absensiId } = req.params
            const updatePengajuan = await declinePengajuanRequestService(absensiId)
            return res.status(200).send({
                status: 'ok',
                updatePengajuan
            })
        } catch (error) {
            next(error);
        };
    };
}