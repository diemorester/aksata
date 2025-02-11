'use client';

import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import UserSettings from './editUser';
import ButtonSpan from '@/components/buttons/spanButtons';
import { useState } from 'react';
import EditAvatarModal from './editAvatarModal';
import ImageCropper from '@/components/ImageCropper';
import RemoveAvatarModal from './removeAvatarModal';

export default function SettingsConfig() {
  const { name, avatar } = useAppSelector((user) => user.user);
  const [isOpenItu, setIsOpenItu] = useState(false);
  const [isRemoveAvatarModal, setIsRemoveAvatarModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [cropImage, setCropImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full">
      <div className="lg:w-full relative h-36 bg-[linear-gradient(to_bottom,_#0a0a0a_50%,_#1a1919_50%)] rounded-t-3xl">
        <div>
          <div className="flex items-center gap-3 md:gap-5 p-5 pt-12">
            <Image
              src={avatar || '/profileplaceholder.png'}
              width={668}
              height={668}
              alt="settings-avatar"
              className="rounded-full w-24 h-24 md:w-[120px] md:h-[120px] object-cover border-8 md:border-[13px] border-[#1a1919]"
            />
            <div className="flex gap-1 md:gap-5">
              <ButtonSpan
                type="button"
                text1="change"
                text2="upload"
                ristoan
                onClick={() => setIsOpenItu(true)}
              />
              <ButtonSpan
                type="submit"
                ristoan
                onClick={() => setIsRemoveAvatarModal(true)}
              >
                remove
              </ButtonSpan>
            </div>
            <div className="font-bold text-neutral-50 lg:text-2xl lg:pt-3 max-[1066px]:hidden absolute right-[77px] text-end">
              {name}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-full h-[400px] rounded-b-3xl bg-[#1a1919] px-2 pb-2 pt-4 lg:px-4 lg:pb-4 lg:pt-8">
        <div className="bg-neutral-800 w-full h-full rounded-3xl">
          <UserSettings />
        </div>
      </div>

      {/* Modal */}
      <EditAvatarModal
        setImage={setImage}
        cropImage={cropImage}
        onClose={() => setIsOpenItu(false)}
        isOpen={isOpenItu}
      />
      <RemoveAvatarModal
        isOpen={isRemoveAvatarModal}
        onClose={() => setIsRemoveAvatarModal(false)}
      />
      <ImageCropper
        image={image}
        setImage={setImage}
        onCropComplete={(crop) => setCropImage(crop)}
      />
    </div>
  );
}
