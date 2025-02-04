import { getAllUserService, getPengajuanByUserIdService } from "@/services/adminHR/adminHR.service";
import { NextFunction, Request, Response } from "express";

export class PengajuanLemburPerdinController {
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

    async getPengajuanByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await getPengajuanByUserIdService(req.params.userId);
            return res.status(200).send({
                status: 'ok',
                response
            })      
        } catch (error) {
            next(error)
        };
    };
}