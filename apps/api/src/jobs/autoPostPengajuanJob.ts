import { autoPostPengajuanService } from "@/services/jobservices/jobServices";
import cron from 'node-cron';

cron.schedule('0 */6 * * *', async () => {
    console.log('sebelum berjalan');
    await autoPostPengajuanService();
    console.log('setelah berjalan');
});