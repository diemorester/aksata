import { autoAlphaAttendance } from '@/services/absensi/absensi.service';
import cron from 'node-cron';

cron.schedule('0 6 * * *', async () => {
  await autoAlphaAttendance();
});