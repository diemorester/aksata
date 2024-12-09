"use client";

import { useState } from "react";
import Cropper from "react-easy-crop";
import ButtonSpan from "./buttons/spanButtons";

interface ImageCropperProps {
  onCropComplete: (cropImage: string) => void;
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  onCropComplete,
  image,
  setImage,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    if (!image || !croppedAreaPixels) return;

    const canvas = document.createElement("canvas");
    const imageEl = new Image();
    imageEl.src = image;

    await new Promise<void>((resolve) => {
      imageEl.onload = () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const { width, height } = croppedAreaPixels;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(
          imageEl,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          width,
          height,
          0,
          0,
          width,
          height,
        );
        resolve();
      };
    });

    const croppedImage = canvas.toDataURL("image/jpeg");
    onCropComplete(croppedImage);
    setImage(null);
  };

  return (
    <div>
      {image && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-600 bg-opacity-75">
          <div className="rounded-lg bg-neutral-900 px-5 py-6 shadow-md">
            <h3 className="mb-2 font-medium text-neutral-100">crop image</h3>
            <div className="relative h-80 w-80 bg-neutral-300">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>

            <div className="mt-5 flex justify-end space-x-5">
              <ButtonSpan type="button" onClick={() => setImage(null)}>
                <p className="">cancel</p>
              </ButtonSpan>
              <ButtonSpan type="button" fill="bg-neutral-300" onClick={handleCrop}>
                apply
              </ButtonSpan>
            </div>
          </div>
        </div>
      )}
    </ div>
  );
};

export default ImageCropper;