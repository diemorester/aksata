import Absensi from './components/Absensi';
import Approval from './components/Approval';
import ListApproval from './components/ListApproval';
import PengajuanKonten from './components/PengajuanKonten';

const Dashboard = () => {
  return (
    <div className="flex flex-col w-screen">
      <div className="w-[950px] min-h-screen fixed right-[17%]">
        <h1 className="text-[24px] font-semibold text-end text-neutral-200 px-3 py-6">
          Absensi
        </h1>
        <div className="p-3 h-[535px] rounded-lg text-center flex flex-col gap-3">
          <div className="flex gap-3">
            <div className='bg-neutral-950 w-2/6 h-[248px] place-content-center rounded-lg'>
            </div>
            <div className="w-4/6 flex gap-x-9 px-6 py-4 bg-neutral-950 h-[248px] rounded-lg">
              <ListApproval />
              <div className='flex justify-center place-content-center'>
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
            <div className="w-2/6 h-[248px] rounded-lg p-1 bg-neutral-950">
              <Absensi />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
