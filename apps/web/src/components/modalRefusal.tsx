"use client"

import ButtonSpan from "@/components/buttons/spanButtons";
import Modal from "@/components/Modal";
import React from "react";

interface ModalRefusalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onDecline: () => void;
}

const ModalRefusal: React.FC<ModalRefusalProps> = ({ isOpen, onClose, onDecline, isLoading }) => {
  return (
    <Modal
      backgroundClose
      onClose={onClose}
      isOpen={isOpen}
      aksata
    >
      <div className="flex flex-col h-44 justify-between text-black">
        <div>
          <h2 className="text-2xl font-bold">Menolak pengajuan</h2>
          <p className='text-sm pt-1 px-1 mb-14'>yakin untuk menolak pengajuan?</p>
        </div>
        <div className="flex flex-row justify-end px-2 gap-6">
          <ButtonSpan
            type="button"
            onClick={onClose}
            classname="font-semibold"
            aksata
          >
            cancel
          </ButtonSpan>
          <ButtonSpan
            type="submit"
            onClick={onDecline}
            fill="bg-black"
            disabled={isLoading}
            classname="font-semibold"
            aksata
          >
            Tolak
          </ButtonSpan>
        </div>
      </div>
    </Modal>
  )
}

export default ModalRefusal