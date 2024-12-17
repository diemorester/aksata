import {
  clockInService,
  clockOutService,
  getAllAttendanceService,
} from '@/services/absensi/absensi.service';
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

  async getAllAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, take, search } = req.query;

      const data = await getAllAttendanceService({
        page: Number(page as string) || 1,
        take: Number(take as string) || 9,
        search: search as string,
      });
      return res.status(200).send({
        status: 'ok',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
