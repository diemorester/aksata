import React from 'react'

const Legenda = () => {
    return (
        <div className='w-1/3 px-6 text-neutral-200'>
            <div className='mb-5 px-2 text-start text-lg font-bold'>
                <h1>Keterangan</h1>
            </div>
            <div className='flex flex-col text-xs font-medium px-1'>
                <div className='flex justify-start gap-10'>
                    <div className='bg-green-500 rounded-full w-3 h-3'></div>
                    <div>
                        <p>Hadir</p>
                    </div>
                </div>
                <div className='flex justify-start gap-10'>
                    <div className='bg-amber-500 rounded-full w-3 h-3'></div>
                    <div>
                        <p>Terlambat</p>
                    </div>
                </div>
                <div className='flex justify-start gap-10'>
                    <div className='bg-[#FFFF33] rounded-full w-3 h-3'></div>
                    <div>
                        <p>Sakit</p>
                    </div>
                </div>
                <div className='flex justify-start gap-10'>
                    <div className='bg-[#87CEFA] rounded-full w-3 h-3'></div>
                    <div>
                        <p>Cuti</p>
                    </div>
                </div>
                <div className='flex justify-start gap-10'>
                    <div className='bg-violet-400 rounded-full w-3 h-3'></div>
                    <div>
                        <p>Izin</p>
                    </div>
                </div>
                <div className='flex justify-start gap-10'>
                    <div className='bg-[#FF0000] rounded-full w-3 h-3'></div>
                    <div>
                        <p>Alpha</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Legenda