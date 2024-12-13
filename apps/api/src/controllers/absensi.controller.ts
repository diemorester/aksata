import { clockInService, clockOutService } from '@/services/absensi.service';
import { NextFunction, Request, Response } from 'express';

export class AbsensiController {
  async clockIn(req: Request, res: Response, next: NextFunction) {
    try {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      const response = await clockInService(req.user?.id!);
      return res.status(200).send({
        msg: `Anda clock-in pada jam ${time}`,
        response,
      });
    } catch (error) {
      next(error);
    }
  }

  async clockOut(req: Request, res: Response, next: NextFunction) {
    try {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      const response = await clockOutService(req.user?.id!);
      return res.status(200).send({
        msg: `Anda clock-out pada jam ${time}`,
        response,
      });
    } catch (error) {
      next(error);
    }
  }
}
