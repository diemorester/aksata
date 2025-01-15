import Absensi from './Absensi';
import DataAbsen from './DataAbsen';
import ListApproval from './ListApproval';
import PengajuanKonten from './PengajuanKonten';

const ContainerAbsensi = () => {
  return (
    <div className="flex flex-col w-screen">
      <div className="w-[950px] min-h-screen fixed right-[17%]">
        <h1 className="text-[24px] font-semibold text-end text-neutral-200 px-3 py-6">
          Absensi
        </h1>
        <div className="p-3 h-[535px] rounded-lg text-center flex flex-col gap-3">
          <div className="flex gap-3">
            <div className='bg-neutral-950 w-2/6 h-[248px] place-content-center rounded-lg'>
            <DataAbsen />
            </div>
            <div className="w-4/6 flex bg-neutral-950 h-[248px] rounded-lg">
              <div className='flex w-2/3 pl-6 py-4'>
                <ListApproval />
              </div>
              <div className='flex w-1/3 justify-center place-content-center'>
                <PengajuanKonten />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-neutral-950 w-4/6 h-[248px] place-content-center rounded-lg">
              <div className='flex justify-between'>

                <div className='flex items-center text-center justify-center w-full'>

                </div>
              </div>
            </div>
            <div className="w-2/6 h-[248px] rounded-lg bg-neutral-950">
              <Absensi />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerAbsensi;
