import { autoPostPengajuanService } from "@/services/jobservices/jobServices";
import cron from 'node-cron';

cron.schedule('0 * * * *', async () => {
  await autoPostPengajuanService();
});