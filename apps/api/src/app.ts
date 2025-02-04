import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT } from './config';
import { UserRouter } from './routers/auth/user.router';
import { DecodeRouter } from './routers/decode.router';
import path from 'path';
import { AbsensiRouter } from './routers/absensi/absensi.route';
import { PengajuanRouter } from './routers/pengajuan/pengajuan.route';
import "./jobs/autoAlphaJob";
import "./jobs/autoClockOutJob";
import { AdminHRRouter } from './routers/adminHR/adminHR.route';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    const corsOptions = {
      origin: process.env.BASE_URL_WEB,
      credentials: true,
    };

    this.app.use(cors(corsOptions));

    this.app.use(cookieParser());

    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(
      '/api/public',
      express.static(path.join(__dirname, '../public')),
    );
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const userRouter = new UserRouter();
    const decodeRouter = new DecodeRouter();
    const absensiRouter = new AbsensiRouter();
    const pengajuanRouter = new PengajuanRouter();
    const adminHRRouter = new AdminHRRouter()

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`welcome to ERP Aksata API`);
    });

    this.app.use('/api/user', userRouter.getRouter());
    this.app.use('/api', decodeRouter.getRouter());
    this.app.use('/api/absensi', absensiRouter.getRouter());
    this.app.use('/api/pengajuan', pengajuanRouter.getRouter());
    this.app.use('/api/admin-hr', adminHRRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}