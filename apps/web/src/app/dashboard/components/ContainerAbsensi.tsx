'use client';

import { BarChartComponent } from '@/components/ui/barChart';
import { PieChartComponent } from '@/components/ui/pieChart';
import Absensi from './Absensi';
import AbsensiHistory from './AbsensiHistory';
import ListApproval from './ListApproval';
import LocationsHistory from './LocationsHistory';
import PengajuanKonten from './PengajuanKonten';
import { useGeolocation } from '@/hooks/useGeolocation ';
import Map from '@/components/Map';

const ContainerAbsensi = () => {
  const { location } = useGeolocation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 w-full min-h-[100px] md:min-h-[550px] md:grid-rows-6 gap-4 h-full">
      <div className="md:col-span-2 md:row-span-3 bg-black rounded-xl p-3">
        <PieChartComponent />
      </div>
      <div className="md:col-span-2 md:row-span-3 md:col-start-7 md:row-start-4 bg-black rounded-xl p-3">
        <Absensi />
      </div>
      <div className="flex md:flex-row flex-col-reverse gap-3 justify-between md:col-span-4 md:row-span-3 md:col-start-3 md:row-start-4 bg-black rounded-xl p-3">
        <LocationsHistory />
      </div>
      <div className="md:col-span-2 md:row-span-3 md:col-start-1 md:row-start-4 bg-black rounded-xl p-3">
        {/* <BarChartComponent /> */}
        {location && (
          <Map latitude={location?.latitude} longitude={location?.longitude} />
        )}
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
