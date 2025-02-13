import { cn } from '@/libs/utils';
import Image from 'next/image';

interface AvatarProps {
  image: string | null;
  size?: 'Icon' | 'Medium' | 'Large'
}

const Avatar: React.FC<AvatarProps> = ({ image, size = 'Icon', }) => {
  return (
    <Image
      src={image || '/profileplaceholder.png'}
      width={666}
      height={666}
      alt="avatar"
      className={cn(`rounded-full object-cover`,
        size === 'Icon' && 'w-8 h-8',
        size === 'Medium' && 'w-16 h-16',
        size === 'Large' && 'w-20 h-20'
      )}
    />
  );
};

export default Avatar;
