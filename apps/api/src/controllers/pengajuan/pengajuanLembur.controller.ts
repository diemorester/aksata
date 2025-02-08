import { approvePengajuanLemburPerdinService, getAllPengajuanLemburService, getAllUserService, getPengajuanLemburPerdinByUserIdService, } from "@/services/pengajuan/pengajuanLemburPerdin.service";
import { NextFunction, Request, Response } from "express";

export class PengajuanLemburPerdinController {
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
            const { user, pengajuanUser: response } = await getPengajuanLemburPerdinByUserIdService(req.params.userId);
            return res.status(200).send({
                status: 'ok',
                user,
                response
            })
        } catch (error) {
            next(error)
        };
    };

    async approvePengajuanLemburPerdin(req: Request, res: Response, next: NextFunction) {
        try {
            const { pengajuanId } = req.params;
            const updatePengajuan = await approvePengajuanLemburPerdinService(pengajuanId);
            return res.status(200).send({
                status: 'ok',
                updatePengajuan
            })
        } catch (error) {
            next(error)
        };
    };
};