'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '../../../../libs/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setIsModalOpen } from '@/redux/slices/modalSlice';
import { deleteCookie, navigate } from '@/libs/server';
import { logoutAction } from '@/redux/slices/userslice';
import img1 from '../../../../../public/aksata-logo.png'
import useRouterHR from '../../hooks/useRoutersHR';
import { SidebarBodyHR, SidebarConfigHR, SidebarLinkHR } from './sidebarHRconfig';
import Modal from '@/components/Modal';
import ButtonSpan from '@/components/buttons/spanButtons';

export function SidebarHR({ children }: { children: React.ReactNode }) {
    const router = useRouterHR();
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
                'flex flex-col md:flex-row bg-off-white w-full flex-1 mx-auto overflow-hidden',
                'h-screen',
            )}
        >
            <SidebarConfigHR open={open} setOpen={setOpen} animate={false}>
                <SidebarBodyHR className="justify-between gap-2">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <>
                            <Logo />
                        </>
                        <div className="mt-10 flex flex-col gap-5">
                            {router.map((link, idx) => (
                                <SidebarLinkHR
                                    key={idx}
                                    href={link.href}
                                    label={link.label}
                                    icon={link.icon}
                                    active={link.active!}
                                    onClick={link.onClick!}
                                />
                            ))}
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
                        <p className="text-black text-xl font-medium">{name}</p>
                    </div>
                </SidebarBodyHR>
            </SidebarConfigHR>
            <div className='overflow-y-auto bg-[#E8EBEF] scrollbar-none w-full'>
                {children}
            </div>
            <Modal isOpen={isOpen} onClose={onCLoseModal} backgroundClose aksata>
                <div className='flex flex-col gap-3 text-black'>
                    <h2 className='text-2xl font-semibold'>Logout</h2>
                    <p className='mb-16'>are you sure you want to logout?</p>
                    <div className='flex flex-row justify-end px-2 gap-6 text-black'>
                        <ButtonSpan type='button' onClick={onCLoseModal} aksata>cancel</ButtonSpan>
                        <ButtonSpan type='button' onClick={logOut} fill='bg-red-500' aksata>log out</ButtonSpan>
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
                alt='aksata-logo'
                className=''
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-black md:text-[26px] px-1"
            >
                AKSATA
            </motion.span>
        </Link>
    );
};