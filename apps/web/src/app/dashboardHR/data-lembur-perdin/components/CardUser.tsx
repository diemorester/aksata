import { AllUserType } from '@/types/userTypes';
import Link from 'next/link';

const CardUser: React.FC<AllUserType> = ({ id, name }) => {
  return (
    <Link href={`/dashboardHR/data-lembur-perdin/${id}`}>
      <p>nama: {name}</p>
    </Link>
  );
};

export default CardUser;
