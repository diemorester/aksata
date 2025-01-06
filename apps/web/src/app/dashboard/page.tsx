import Absensi from './components/Absensi';
import Legenda from './components/Legenda';

const Dashboard = () => {
  return (
    <div className="flex flex-col w-screen">
      <div className="w-[950px] min-h-screen fixed right-[17%]">
        <h1 className="text-[24px] font-semibold text-end text-neutral-200 px-3 py-6">
          Absensi
        </h1>
        <div className="p-3 h-[535px] rounded-lg text-center flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="bg-neutral-950 w-2/6 h-[248px] place-content-center rounded-lg">

            </div>
            <div className="bg-neutral-950 w-4/6 h-[248px] place-content-center rounded-lg">

            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-neutral-950 w-4/6 h-[248px] place-content-center rounded-lg">
              <div className='flex justify-between'>
                <Legenda />
                <div className='flex items-center text-center justify-center w-full'>kalender</div>
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
