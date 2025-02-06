import { autoAlphaAttendance } from '@/services/jobservices/jobServices';
import cron from 'node-cron';

cron.schedule('0 6 * * *', async () => {
  await autoAlphaAttendance();
});