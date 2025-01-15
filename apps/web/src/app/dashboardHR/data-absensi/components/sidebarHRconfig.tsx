'use client';
import { cn } from '../../../../libs/utils';
import Link from 'next/link';
import React, { useState, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { IconType } from 'react-icons';

interface SidebarHRContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
}

const SidebarContext = createContext<SidebarHRContextProps | undefined>(
    undefined,
);

export const useSidebarHR = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

export const SidebarProviderHR = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    const [openState, setOpenState] = useState(false);

    const open = openProp !== undefined ? openProp : openState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

    return (
        <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const SidebarConfigHR = ({
    children,
    open,
    setOpen,
    animate,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    return (
        <SidebarProviderHR open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProviderHR>
    );
};

export const SidebarBodyHR = (props: React.ComponentProps<typeof motion.div>) => {
    return (
        <>
            <DesktopSidebarHR {...props} />
            <MobileSidebarHR {...(props as React.ComponentProps<'div'>)} />
        </>
    );
};

export const DesktopSidebarHR = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof motion.div>) => {
    const { open, setOpen, animate } = useSidebarHR();
    return (
        <>
            <motion.div
                className={cn(
                    'h-full hidden mt-5 px-4 md:flex md:flex-col bg-off-white w-[300px] flex-shrink-0',
                    className,
                    open ? '' : '',
                )}
                {...props}
            >
                {children}
            </motion.div>
        </>
    );
};

export const MobileSidebarHR = ({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) => {
    const { open, setOpen } = useSidebarHR();
    return (
        <>
            <div
                className={cn(
                    'h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-off-white w-full',
                )}
                {...props}
            >
                <div className="flex justify-end z-20 w-full">
                    <IconMenu2
                        className="text-black"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-100%', opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut',
                            }}
                            className={cn(
                                'fixed h-full w-full inset-0 bg-off-white p-10 z-[100] flex flex-col justify-between',
                                className,
                            )}
                        >
                            <div
                                className="absolute right-10 top-10 z-50 text-black"
                                onClick={() => setOpen(!open)}
                            >
                                <IconX />
                            </div>
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export const SidebarLinkHR = ({
    label,
    href,
    icon: Icon,
    active,
    onClick,
}: {
    label: string;
    href: string;
    icon: IconType;
    active: boolean;
    onClick: () => void;
}) => {
    const { open, animate } = useSidebarHR();
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };
    
    return (
        <div onClick={handleClick}>
            <Link
                href={href}
                className={cn(
                    `flex items-center justify-start gap-2 px-3 py-1  group/sidebar text-neutral-800`,
                    active && 'bg-broken-white rounded-lg'
                )}
            >
                <Icon size={30} />

                <motion.span
                    animate={{
                        display: animate
                            ? open
                                ? 'inline-block'
                                : 'none'
                            : 'inline-block',
                        opacity: animate ? (open ? 1 : 0) : 1,
                    }}
                    className="text-black text-lg font-medium group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block px-3"
                >
                    {label}
                </motion.span>
            </Link>
        </div>
    );
};
