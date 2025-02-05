import Image from 'next/image';

interface AvatarProps {
  image: string | null;
}

const Avatar = (props: AvatarProps) => {
  return (
    <Image
      src={props.image || '/profileplaceholder.png'}
      width={33}
      height={33}
      alt="avatar"
      className="rounded-full w-8 h-8"
    />
  );
};

export default Avatar;
