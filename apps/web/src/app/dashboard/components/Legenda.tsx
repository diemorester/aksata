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

// export const getAllAttendanceService = async (query: AbsensiQuery) => {
//     try {
//       const { search, take = 9, page = 1, filterBy } = query;
//       const now = new Date();
//       const skip = (page - 1) * take;
  
//       let startDate: Date | undefined;
//       let endDate: Date | undefined;
  
//       // Perhitungan tahun fiskal
//       const fiscalYearStart = new Date(now.getFullYear(), 0, 21); // 21 Januari tahun ini
//       const fiscalYearEnd = new Date(now.getFullYear() + 1, 0, 20); // 20 Januari tahun depan
  
//       // Penyesuaian tanggal berdasarkan filter
//       if (filterBy === 'daily') {
//         // Menampilkan data hanya untuk hari ini
//         startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//         endDate = new Date(startDate);
//         endDate.setDate(startDate.getDate() + 1);
//       } else if (filterBy === 'weekly') {
//         // Menampilkan data untuk minggu ini
//         const dayOfWeek = now.getDay();
//         startDate = new Date(now);
//         startDate.setDate(now.getDate() - dayOfWeek); // Awal minggu
//         startDate.setHours(0, 0, 0, 0);
//         endDate = new Date(startDate);
//         endDate.setDate(startDate.getDate() + 7); // Akhir minggu
//       } else if (filterBy === 'monthly') {
//         // Menampilkan data dari tanggal 21 bulan ini sampai tanggal 20 bulan depan
//         startDate = new Date(now.getFullYear(), now.getMonth(), 21);
//         endDate = new Date(now.getFullYear(), now.getMonth() + 1, 20); // Tanggal 20 bulan depan
//       } else if (filterBy === 'yearly') {
//         // Menampilkan data dari 21 Januari tahun ini sampai 20 Januari tahun depan
//         startDate = fiscalYearStart;
//         endDate = fiscalYearEnd;
//       }
  
//       // Mengambil data absensi sesuai rentang tanggal yang ditentukan
//       const attendance = await prisma.absensi.findMany({
//         where: {
//           user: {
//             name: {
//               contains: search,
//             },
//           },
//           date: {
//             gte: startDate,
//             lte: endDate,
//           },
//           pengajuan: {
//             every: {
//               status: 'Approved',
//               // Untuk filter pengajuan berdasarkan tanggal cut-off:
//               startDate: {
//                 gte: startDate,
//                 lte: endDate
//               },
//             },
//           },
//         },
//         orderBy: {
//           date: 'desc',
//         },
//         skip,
//         take,
//         include: {
//           user: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//           pengajuan: {
//             select: {
//               startDate: true,
//               endDate: true
//             }
//           }
//         },
//       });
  
//       // Menghitung total absensi sesuai rentang tanggal yang ditentukan
//       const total = await prisma.absensi.count({
//         where: {
//           user: {
//             name: {
//               contains: search,
//             },
//           },
//           date: {
//             gte: startDate,
//             lte: endDate,
//           },
//         },
//       });
  
//       return {
//         meta: {
//           total,
//           page,
//           take,
//           totalPages: Math.ceil(total / take),
//         },
//         attendance,
//       };
//     } catch (error) {
//       throw error;
//     }
//   };
  