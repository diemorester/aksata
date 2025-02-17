'use client';

import ButtonSpan from '@/components/buttons/spanButtons';
import ListCardAbsensi from './listCardAbsensi';
import Pagination from './pagination';
import { useState } from 'react';
import useAbsensi from '@/hooks/useAbsensi';
import SearchBarInput from './searchBarHR';
import useDebounce from '@/hooks/useDebounce';
import DropDown from '@/components/dropdowns/dropDown';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { excelFetch } from '@/libs/fetch/absensi';
import { Empty } from 'antd';
import { IoSearch } from "react-icons/io5";

const TabelAbsensi = () => {
    const [search, setSearch] = useState('');
    const [filterBy, setFilterBy] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const [page, setPage] = useState(1);

    const filterDebounce = useDebounce(filterBy, 300);
    const searchDebounce = useDebounce(search, 300);
    const { data, isPending } = useAbsensi({ page, take: 9, search: searchDebounce, filterBy: filterDebounce });

    const option = [
        {
            label: 'Hari',
            value: 'daily'
        },
        {
            label: 'Minggu',
            value: 'weekly'
        },
        {
            label: 'Bulan',
            value: 'monthly'
        },
        {
            label: 'Tahun',
            value: 'yearly'
        }
    ];

    const handleSelect = (value: string) => {
        setFilterBy(value)

    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    const handleChange = ({ selected }: { selected: number }) => {
        setPage(selected + 1);
    };

    const handleToggle = () => {
        setIsOpenSearch(!isOpenSearch)
    }

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const res = await excelFetch(filterBy);
            const link = document.createElement('a');
            const url = window.URL.createObjectURL(new Blob([res.data]));
            link.href = url
            link.setAttribute('download', 'Data-Absensi.xlsx')
            document.body.appendChild(link);
            link.click()
            link.parentNode?.removeChild(link)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error('download failed')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className="w-full bg-off-white">
                <div className="flex flex-col justify-between rounded-md px-3">
                    <div className='flex items-center justify-between pt-3'>
                        <SearchBarInput search={search} onChange={handleSearch} />
                        <div className="flex justify-end md:gap-x-2 items-center">
                            <div className='md:min-w-[130px]'>
                                <DropDown onSelect={handleSelect} options={option} pengajuanHR />
                            </div>
                            <ButtonSpan classname='md:px-5 md:py-3' type="submit" fill="bg-black" onClick={handleDownload} disabled={isLoading}>
                                Export
                            </ButtonSpan>
                        </div>
                    </div>
                    <table className="mt-2 md:w-full table-fixed border-collapse">
                        <thead className="pb-5 text-black">
                            <tr className="border-b-[2px] text-start border-black">
                                <th className="p-3 text-start font-semibold" style={{ width: "30%" }}>
                                    Nama
                                </th>
                                <th className="hidden p-3 text-center md:table-cell font-semibold" style={{ width: "15%" }}>
                                    Clock-In
                                </th>
                                <th className="hidden p-3 text-center md:table-cell font-semibold" style={{ width: "15%" }}>
                                    Clock-Out
                                </th>
                                <th className="hidden p-3 text-center md:table-cell font-semibold" style={{ width: "20%" }}>
                                    Durasi
                                </th>
                                <th className="p-3 font-semibold" style={{ width: "30%" }}>
                                    Tanggal
                                </th>
                                <th className="p-3 text-center" style={{ width: "10%" }}>Status</th>
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
                        <div className='flex w-full h-full place-content-center py-32 items-center'>
                            <Empty />
                        </div>
                    )}
                    <div className="my-3 flex justify-center">
                        <Pagination
                            total={data?.meta.totalPages!}
                            onPageChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabelAbsensi;