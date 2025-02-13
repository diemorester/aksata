import { autoClockOutAttendance } from '@/services/jobservices/jobServices';
import cron from 'node-cron';

cron.schedule('0 12 * * *', async () => {
  await autoClockOutAttendance();
});