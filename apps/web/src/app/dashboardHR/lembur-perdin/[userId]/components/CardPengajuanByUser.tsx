import { PengajuanLemburPerdinType } from '@/types/pengajuanTypes';

const CardPengajuanByUser: React.FC<PengajuanLemburPerdinType> = ({
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
      <p>hari : {date}</p>
      <p>keterangan: {keterangan}</p>
    </div>
  );
};

export default CardPengajuanByUser;
