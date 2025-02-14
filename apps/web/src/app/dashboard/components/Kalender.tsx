"use client"

interface KalenderProps {
    onClick: () => void;
}

const Kalender: React.FC<KalenderProps> = ({ onClick }) => {
    const now = new Date();
    const date = now.getDate();
    const day = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu'
    ];
    const month = [
        'JANUARI',
        'FEBRUARI',
        'MARET',
        'APRIL',
        'MEI',
        'JUNI',
        'JULI',
        'AGUSTUS',
        'SEPTEMBER',
        'OKTOBER',
        'NOVEMBER',
        'DESEMBER',
    ];
    const monthNow = now.getMonth();
    const dayNow = now.getDay();

    return (
        <div className="">
            <button onClick={onClick} className="relative active:scale-95 transition ease-in-out">
                <div className="absolute -top-3">
                    <div className="flex w-[150px] justify-around gap-6">
                        <div className="rounded-md w-[16px] h-[28px] bg-black border-off-white border-2"></div>
                        <div className="rounded-md w-[16px] h-[28px] bg-black border-off-white border-2"></div>
                    </div>
                </div>
                <div className="font-bold w-[150px] h-[40px] bg-[#F4364C] pt-3 text-off-white rounded-t-lg">
                    {month[monthNow]}
                </div>
                <div className="font-bold w-[150px] h-[90px] bg-off-white text-black place-content-center rounded-b-lg">
                    <div className="text-6xl">
                        {date}
                    </div>
                    <div className="">
                        {day[dayNow]}
                    </div>
                </div>
            </button>
        </div>
    )
}

export default Kalender