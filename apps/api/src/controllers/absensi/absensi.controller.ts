import {
  clockInService,
  clockOutService,
  exportExcelService,
  getAllAttendanceByUserIdService,
  getAllAttendanceService,
  getAttendanceByUserIdService,
  pieData,
} from '@/services/absensi/absensi.service';
import { NextFunction, Request, Response } from 'express';

export class AbsensiController {
  async clockIn(req: Request, res: Response, next: NextFunction) {
    try {
      const now = new Date();
      const time = now.toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const response = await clockInService(req.user?.id!, req.body);
      return res.status(200).send({
        msg: `Anda melakukan clock-in pada jam ${time}`,
        response,
      });
    } catch (error) {
      next(error);
    }
  }

  async clockOut(req: Request, res: Response, next: NextFunction) {
    try {
      const now = new Date();
      const time = now.toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      const response = await clockOutService(req.user?.id!);
      return res.status(200).send({
        msg: `Anda melakukan clock-out pada jam ${time}`,
        response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserAttendance(req: Request, res: Response) {
    try {
      const userId = req.user?.id!;
      const { hadir, cuti, izin, sakit, alpha, total } = await pieData(userId);
      res.status(200).send({
        status: 'ok',
        hadir,
        cuti,
        izin,
        sakit,
        alpha,
        total,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error',
      });
    }
  }

  async getAttendanceById(req: Request, res: Response, next: NextFunction) {
    try {
      const absensi = await getAttendanceByUserIdService(req.user?.id!);
      return res.status(200).send({
        status: 'ok',
        absensi,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllAttendanceById(req: Request, res: Response, next: NextFunction) {
    try {
      const allAbsensi = await getAllAttendanceByUserIdService(req.user?.id!);
      return res.status(200).send({
        status: 'ok baaang',
        allAbsensi,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, take, search, filterBy } = req.query;

      const data = await getAllAttendanceService({
        page: Number(page as string) || 1,
        take: Number(take as string) || 9,
        search: search as string,
        filterBy:
          (filterBy as 'daily' | 'weekly' | 'monthly' | 'yearly') || 'daily',
      });

      return res.status(200).send({
        status: 'ok',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async exportExcel(req: Request, res: Response, next: NextFunction) {
    try {
      const { filterBy } = req.query
      const excelFile = await exportExcelService({
        filterBy:
          (filterBy as 'daily' | 'weekly' | 'monthly' | 'yearly') || 'daily',
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=ERP-aksata.xlsx',
      );

      return res.status(200).send(excelFile);
    } catch (error) {
      next(error);
    }
  }
}
