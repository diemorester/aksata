import ListPengajuanAbsensi from "./listPengajuanAbsensi"

const ContainerHRDashboard = () => {
  return (
    <div className="flex flex-col">
        <div className="w-full min-h-screen text-black mx-auto">
            <div className="flex w-full justify-end items-center pt-8 px-8">
                <h1 className="text-[24px] font-semibold pb-4">
                    DASHBOARD
                </h1>
            </div>
            <div className="rounded-md mx-5 px-3 h-full md:min-h-[550px]">
                <ListPengajuanAbsensi />
            </div>
        </div>
    </div>
  )
}

export default ContainerHRDashboard