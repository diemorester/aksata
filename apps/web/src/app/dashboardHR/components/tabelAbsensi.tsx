'use client';
import ButtonSpan from '@/components/buttons/spanButtons';
import ListCardAbsensi from './listCardAbsensi';
import Pagination from './pagination';
import { useState } from 'react';
import useAbsensi from '@/hooks/useAbsensi';
import SearchBarInput from './searchBarHR';
import useDebounce from '@/hooks/useDebounce';
import SkeletonAbsensi from './skeletonAbsensi';
import Image from 'next/image';
import DropDown from '@/components/dropdowns/dropDown';

const TabelAbsensi = () => {
    const [search, setSearch] = useState('');
    const [filterBy, setFilterBy] = useState('');
    const [page, setPage] = useState(1);

    const filterDebounce = useDebounce(filterBy, 300);
    const searchDebounce = useDebounce(search, 300);
    const { data, isPending } = useAbsensi({ page, take: 9, search: searchDebounce, filterBy: filterDebounce });

    const option = [
        {
            label: 'Filter: Harian',
            value: 'daily'
        },
        {
            label: 'Filter: Mingguan',
            value: 'weekly'
        },
        {
            label: 'Filter: Bulanan',
            value: 'monthly'
        },
        {
            label: 'Filter: Tahunan',
            value: 'yearly'
        }
    ]

    const handleSelect = (value: string) => {
        setFilterBy(value)

    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleChange = ({ selected }: { selected: number }) => {
        setPage(selected + 1);
    };

    return (
        <div className="flex flex-col">
            <div className="w-full min-h-screen mx-auto">
                <div className="flex w-full justify-between items-center px-2 pt-5">
                    <SearchBarInput search={search} onChange={handleSearch} />
                    <h1 className="text-[24px] font-semibold text-end text-black pb-1 px-6">
                        DASHBOARD
                    </h1>
                </div>
                <div className="flex flex-col justify-between rounded-md mx-5 px-3 bg-slate-100 h-full  md:min-h-[550px]">
                    <table className="mt-2 md:w-full">
                        <thead className="pb-5 text-black">
                            <tr className="border-b-[2px] text-start border-black">
                                <th className="p-3 text-start font-semibold">Nama</th>
                                <th className="hidden p-3 text-center md:table-cell font-semibold">
                                    Waktu Check-In
                                </th>
                                <th className="hidden p-3 text-center md:table-cell font-semibold">
                                    Waktu Check-Out
                                </th>
                                <th className="hidden p-3 md:table-cell font-semibold">
                                    <div className='flex justify-center'>
                                        <DropDown onSelect={handleSelect} options={option} />
                                    </div>
                                </th>
                                <th className="p-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListCardAbsensi
                                attendance={data?.attendance!}
                                isPending={isPending}
                            />
                        </tbody>
                    </table>
                    {data?.attendance.length === 0 && (
                        <div className='flex w-full h-full place-content-start px-48 items-center'>
                            <Image
                                width={460}
                                height={400}
                                alt='error dashboard'
                                src="/dashboardHR-error.svg"
                                className=''
                            />
                        </div>
                    )}
                    <div className="mb-3 flex justify-center">
                        <Pagination
                            total={data?.meta.totalPages!}
                            onPageChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end  items-center px-8 pt-[11px]">
                    <ButtonSpan type="submit" fill="bg-green-500">
                        PRINT
                    </ButtonSpan>
                </div>
            </div>
        </div>
    );
};

export default TabelAbsensi;
