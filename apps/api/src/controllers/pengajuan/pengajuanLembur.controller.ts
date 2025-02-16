import { approvePengajuanLemburPerdinService, declinePengajuanLemburPerdinService, getAllPengajuanLemburService, getAllUserService, getPengajuanLemburPerdinByUserIdService, pengajuanLemburPerdinService, } from "@/services/pengajuan/pengajuanLemburPerdin.service";
import { NextFunction, Request, Response } from "express";

export class PengajuanLemburPerdinController {
    async pengajuanLemburPerdin(req: Request, res: Response, next: NextFunction) {
        try {
            await pengajuanLemburPerdinService(req.body, req.user?.id!)
            return res.status(200).send({
                status: 'ok',
                msg: 'Pengajuan Berhasil'
            })
        } catch (error) {
            next(error);
        };
    };

    async getAllPengajuanLembur(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await getAllPengajuanLemburService(req.user?.id!);
            return res.status(200).send({
                status: 'ok',
                response
            })
        } catch (error) {
            next(error);
        }
    };

    async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await getAllUserService();
            return res.status(200).send({
                status: 'ok',
                response
            })
        } catch (error) {
            next(error)
        };
    };

    async getPengajuanLemburPerdinByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            // const { user, pengajuanUser: response } = await getPengajuanLemburPerdinByUserIdService(req.params.userId);
            const { userId } = req.params;
            const filterType = req.query.filterType as 'Monthly' | 'Yearly';

            if (!filterType || (filterType !== 'Monthly' && filterType !== 'Yearly')) {
                throw new Error("Tipe Filter harus 'Monthly' atau 'Yearly'");
            }

            const response = await getPengajuanLemburPerdinByUserIdService(userId, filterType)
            return res.status(200).send({
                status: 'ok',
                ...response
            })
        } catch (error) {
            next(error)
        };
    };

    async approvePengajuanLemburPerdin(req: Request, res: Response, next: NextFunction) {
        try {
            const { pengajuanId } = req.params;
            const approvePengajuan = await approvePengajuanLemburPerdinService(pengajuanId);
            return res.status(200).send({
                status: 'ok',
                approvePengajuan
            })
        } catch (error) {
            next(error)
        };
    };

    async declinePengajuanLemburPerdin(req: Request, res: Response, next: NextFunction) {
        try {
            const { pengajuanId } = req.params;
            const declinedPengajuan = await declinePengajuanLemburPerdinService(pengajuanId);
            return res.status(200).send({
                status: 'ok',
                declinedPengajuan
            });
        } catch (error) {
            next(error)
        };
    };
};