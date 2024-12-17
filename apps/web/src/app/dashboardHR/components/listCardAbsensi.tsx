'use client';
import CardDataAbsensi from './cardDataAbsensi';
import { Absensi } from '@/types/absensiTypes';
import SkeletonAbsensi from './skeletonAbsensi';
import Image from 'next/image';

interface ListCardAbsensiProps {
    attendance: Absensi[];
    isPending: boolean;
}

const ListCardAbsensi: React.FC<ListCardAbsensiProps> = ({
    attendance,
    isPending
}) => {

    if (isPending) {
        return <>
            <SkeletonAbsensi />
            <SkeletonAbsensi />
            <SkeletonAbsensi />
            <SkeletonAbsensi />
            <SkeletonAbsensi />
            <SkeletonAbsensi />
            <SkeletonAbsensi />
            <SkeletonAbsensi />
            <SkeletonAbsensi />
        </>;
    }

    return (
        <>
            {attendance.map((absen) => {
                return (
                    <CardDataAbsensi
                        key={absen.id}
                        name={absen.user.name}
                        date={absen.date}
                        clockIn={absen.clockIn}
                        clockOut={absen.clockOut}
                        status={absen.status}
                    />
                );
            })}
        </>
    );
};

export default ListCardAbsensi;
