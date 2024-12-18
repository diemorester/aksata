import { autoAlphaAttendance } from '@/services/absensi/absensi.service';
import cron from 'node-cron';

cron.schedule('0 13 * * *', async () => {
  console.log('RUNNING AUTO SET ALPHA STATUS');
  await autoAlphaAttendance();
  console.log('ALPHA STATUS COMPLETED ALPHA');
});
