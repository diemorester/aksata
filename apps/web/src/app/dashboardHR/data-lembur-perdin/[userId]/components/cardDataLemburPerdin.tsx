"use client"

import { PengajuanLemburPerdinType } from '@/types/pengajuanTypes';

const CardDataLemburPerdin: React.FC<PengajuanLemburPerdinType> = ({
  id,
  date,
  createdAt,
  keterangan,
  nominal,
  statusPengajuan,
  tipePengajuan,
  updatedAt,
  userId,
}) => {
  return (
    <div>
      <p>{tipePengajuan}</p>
      <p>hari : {date}</p>
      <p>keterangan: {keterangan}</p>
    </div>
  );
};

export default CardDataLemburPerdin;
