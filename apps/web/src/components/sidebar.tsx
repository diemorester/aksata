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
import { deleteCookie, navigate } from '@/libs/server';
import { logoutAction } from '@/redux/slices/userslice';
import img1 from '../../public/company-logo.png'
import ButtonSpan from './buttons/spanButtons';

export function Sidebar({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { name, avatar } = useAppSelector((user) => user.user);
    const { isOpen } = useAppSelector((state) => state.modal);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const onCLoseModal = () => {
        dispatch(setIsModalOpen(false));
    };

    const logOut = () => {
        deleteCookie('access_token')
        deleteCookie('refreshToken')
        dispatch(logoutAction())
        dispatch(setIsModalOpen(false))
        localStorage.clear()
        navigate('/')
    }

    return (
        <div
            className={cn(
                'flex flex-col md:flex-row bg-neutral-950 w-full flex-1 mx-auto overflow-hidden',
                'h-screen',
            )}
        >
            <SidebarConfig open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-2">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-10 flex flex-col gap-5">
                            {/* {router.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    href={link.href}
                                    label={link.label}
                                    icon={link.icon}
                                    active={link.active}
                                    onClick={link.onClick!}
                                />
                            ))} */}
                        </div>
                    </div>
                    <div className="mb-11 px-1 flex gap-3 justify-start items-center text-ellipsis">
                        <Image
                            src={avatar || '/profileplaceholder.png'}
                            width={33}
                            height={33}
                            alt="avatar"
                            className="rounded-full w-8 h-8"
                        />
                        {open && <p className="text-white text-xl font-medium">{name}</p>}
                    </div>
                </SidebarBody>
            </SidebarConfig>
            <div className='overflow-y-auto bg-[#2c2c2c] scrollbar-none w-full'>
                {children}
            </div>
            <Modal isOpen={isOpen} onClose={onCLoseModal} ristoan backgroundClose>
                <div className='flex flex-col gap-3 text-neutral-100'>
                    <h2 className='text-2xl font-semibold'>Logout</h2>
                    <p className='mb-16'>are you sure you want to logout?</p>
                    <div className='flex flex-row justify-end px-2 gap-6 text-neutral-100'>
                        <ButtonSpan type='button' ristoan onClick={onCLoseModal}>cancel</ButtonSpan>
                        <ButtonSpan type='button' ristoan onClick={logOut} fill='bg-red-500'>log out</ButtonSpan>
                    </div>
                </div>
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
            <Image
                width={40}
                height={40}
                src={img1}
                alt='company-logo'
                className=''
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-off-white md:text-xl px-1 whitespace-pre"
            >
                Ristoan Tri Laras
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Image
            width={36}
            height={36}
            src={img1}
            alt='company-logo'
            className=''
        />
    );
};
