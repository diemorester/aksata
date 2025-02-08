'use client';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { GoGitPullRequest, GoGitPullRequestDraft } from 'react-icons/go';
import { LuClipboardList, LuClipboardPaste } from "react-icons/lu";
import { IoMdSettings } from 'react-icons/io';
import { VscSignOut } from 'react-icons/vsc';

const useRouterHR = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const router = useMemo(
    () => [
      {
        label: 'Absensi',
        href: '/dashboardHR',
        icon: GoGitPullRequestDraft,
        active: pathName == '/dashboardHR',
      },
      {
        label: 'Lembur & Perdin',
        href: '/dashboardHR/lembur-perdin',
        icon: GoGitPullRequest,
        active: pathName == '/dashboardHR/lembur-perdin',
      },
      {
        label: 'Data Absensi',
        href: '/dashboardHR/data-absensi',
        icon: LuClipboardList,
        active: pathName == '/dashboardHR/data-absensi',
      },
      {
        label: 'Data Lembur & Perdin',
        href: '/dashboardHR/data-lembur-perdin',
        icon: LuClipboardPaste,
        active: pathName.startsWith('/dashboardHR/data-lembur-perdin'),
      },
      {
        label: 'Settings',
        href: '/dashboardHR/settings',
        icon: IoMdSettings,
        active: pathName == '/dashboardHR/settings',
      },
      {
        label: 'Logout',
        href: '#',
        icon: VscSignOut,
        onClick: handleToggleModal,
      },
    ],
    [pathName, handleToggleModal],
  );
  return { router, isOpen, handleToggleModal };
};

export default useRouterHR;
