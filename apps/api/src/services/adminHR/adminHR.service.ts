import prisma from '@/prisma';

export const getAllUserService = async () => {
  try {
    const allUser = await prisma.user.findMany({
      where: {
        role: 'User',
      },
    });
    return allUser;
  } catch (error) {
    throw error;
  }
};

export const getPengajuanByUserIdService = async (userId: string) => {
  try {
    const pengajuanUser = await prisma.pengajuan.findMany({
      where: {
        userId,
      },
    });
    return pengajuanUser;
  } catch (error) {
    throw error;
  }
};
