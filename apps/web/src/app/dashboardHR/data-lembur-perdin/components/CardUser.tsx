import Avatar from '@/components/Avatar';
import { AllUserType } from '@/types/userTypes';
import Link from 'next/link';

const CardUser: React.FC<AllUserType> = ({ id, name, avatar, phone }) => {
  return (
    <Link href={`/dashboardHR/data-lembur-perdin/${id}`} className='rounded-xl bg-off-white p-6 h-32'>
      <div className='flex justify-start gap-x-6 items-center'>
        <Avatar size='Large' image={avatar} />
        <div className='flex flex-col gap-3'>
          <p className="font-semibold text-lg leading-none">{name}</p>
          <p className='font-light text-sm px-1'>{phone === null ? '-' : `+62 ${phone}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardUser;
