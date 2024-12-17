import Absensi from './components/Absensi';

const Dashboard = () => {
  return (
    <div className="flex flex-col w-screen">
      <div className="w-[950px] min-h-screen fixed right-[17%]">
        <h1 className="text-[24px] font-semibold text-end text-neutral-100 px-3 py-6">
          Absensi
        </h1>
        <div className="bg-neutral-900 p-3 h-[535px] rounded-lg text-center flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="bg-neutral-600 w-2/6 h-[248px] place-content-center rounded-lg">
              
            </div>
            <div className="bg-neutral-600 w-4/6 h-[248px] place-content-center rounded-lg">
              
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-neutral-600 w-4/6 h-[248px] place-content-center rounded-lg">
              
            </div>
            <div className="bg-neutral-600 w-2/6 h-[248px] rounded-lg">
              <Absensi />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
