'use client';
import React, { useState } from 'react';
import { SidebarBody, SidebarConfig, SidebarLink } from './ui/sidebarconfig';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '../libs/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import useRouter from '@/hooks/useRouters';
import Modal from './Modal';
import { setIsModalOpen } from '@/redux/slices/modalSlice';

export function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { name, avatar } = useAppSelector((user) => user.user);
  const { isOpen } = useAppSelector((state) => state.modal);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const onCLoseModal = () => {
    dispatch(setIsModalOpen(false));
  };

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden',
        'h-screen',
      )}
    >
      <SidebarConfig open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-2">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-10 flex flex-col gap-5">
              {router.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  active={link.active}
                  onClick={link.onClick!}
                />
              ))}
            </div>
          </div>
          <div className="mb-11 px-1 flex gap-3 justify-start items-center">
            <Image
              src={avatar || '/profileplaceholder.png'}
              width={33}
              height={33}
              alt="avatar"
              className="rounded-full"
            />
            {open && <p className="text-white text-xl font-medium">{name}</p>}
          </div>
        </SidebarBody>
      </SidebarConfig>
      {children}
      <Modal isOpen={isOpen} onClose={onCLoseModal}>
        Content disini
      </Modal>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-3 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-7 w-7 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-black dark:text-white text-[26px] px-1 whitespace-pre"
      >
        Ristoan Tri Laras
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-7 w-7 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};