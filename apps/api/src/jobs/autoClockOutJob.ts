import { autoClockOutAttendance } from '@/services/absensi/absensi.service';
import cron from 'node-cron';

cron.schedule('0 18 * * *', async () => {
  await autoClockOutAttendance();
});