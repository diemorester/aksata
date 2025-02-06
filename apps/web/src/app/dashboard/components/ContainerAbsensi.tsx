import { PieChartComponent } from '@/components/ui/pieChart';
import Absensi from './Absensi';
import AbsensiHistory from './AbsensiHistory';
import ListApproval from './ListApproval';
import PengajuanKonten from './PengajuanKonten';
import { BarChartComponent } from '@/components/ui/barChart';

const ContainerAbsensi = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 w-full min-h-[100px] md:min-h-[550px] md:grid-rows-6 gap-4 h-full">
      <div className="md:col-span-2 md:row-span-3 bg-black rounded-xl p-3">
        <PieChartComponent />
      </div>
      <div className="md:col-span-2 md:row-span-3 md:col-start-7 md:row-start-4 bg-black rounded-xl p-3">
        <Absensi />
      </div>
      <div className="flex md:flex-row flex-col-reverse justify-between md:col-span-4 md:row-span-3 md:col-start-3 md:row-start-4 bg-black rounded-xl p-3">
        <p>HISTORY</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.223187511981!2d107.5904121994972!3d-6.913808456865164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e727f9c63d7d%3A0xfcdaa626835e74fa!2sStasiun%20Bandung!5e0!3m2!1sid!2sid!4v1738749489171!5m2!1sid!2sid"
          className="rounded-xl h-full"
        ></iframe>
      </div>
      <div className="md:col-span-2 md:row-span-3 md:col-start-1 md:row-start-4 bg-black rounded-xl p-3">
        <BarChartComponent />
      </div>
      <div className="justify-center flex items-center md:col-span-2 md:row-span-3 md:col-start-7 md:row-start-1 bg-black rounded-xl p-3">
        <AbsensiHistory />
      </div>
      <div className="md:col-span-4 md:row-span-3 md:col-start-3 md:row-start-1 bg-black rounded-xl p-3">
        <div className="w-full h-full gap-y-2 justify-center gap-x-3 flex flex-col-reverse md:flex-row">
          <div className="md:w-2/3 max-h-[240px] overflow-y-auto scrollbar-none">
            <ListApproval />
          </div>
          <div className="md:w-1/3">
            <PengajuanKonten />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerAbsensi;
