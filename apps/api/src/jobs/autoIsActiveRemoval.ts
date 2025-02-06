import { autoIsActiveRemoval } from '@/services/jobservices/jobServices';
import cron from 'node-cron';

cron.schedule('0 13 * * *', async () => {
  await autoIsActiveRemoval();
});