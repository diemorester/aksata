import { createAccessToken, createRefreshToken, createToken } from '@/helpers/createToken';
import { hashPassword } from '@/helpers/hashPassword';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';
import { compare } from 'bcrypt';

const base_url = process.env.BASE_URL_API || "http://localhost:8000/api";

export const RegisterUserService = async (body: User) => {
  try {
    const { name, email, password } = body;
    const userName = await prisma.user.findFirst({ where: { name } })
    const userEmail = await prisma.user.findFirst({ where: { email } })

    if (userName?.name)
      throw new Error('name already exists');

    if (userEmail?.email)
      throw new Error('email already exists');

    const newPass = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: newPass,
        role: 'User',
      },
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    const templatePath = path.join(__dirname, '../../templates', 'verify.hbs');

    const token = createToken(payload, '5m');
    const link = process.env.BASE_URL_WEB + `/verify/${token}`;
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate({ link });

    await transporter.sendMail({
      to: email,
      subject: 'Verification email',
      html,
    });

    return token
  } catch (error) {
    throw error;
  }
};

export const verifyUserService = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user?.isVerified) throw new Error('User has already been verified');

    const verifiedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isVerified: true,
      },
    });

    return verifiedUser
  } catch (error) {
    throw error;
  }
};

export const loginUserService = async (body: User) => {
  try {
    const { email, password } = body;

    // Cari user berdasarkan email
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) throw new Error('User not found');

    if (!user.isVerified) throw new Error('User not verified');

    // Periksa password
    const isValidPass = await compare(password!, user.password!);
    if (!isValidPass) throw new Error('Incorrect password');

    // Buat payload token
    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    // Buat Access Token (berlaku singkat) dan Refresh Token (berlaku panjang)
    const accessToken = createAccessToken(payload); // Expires in 15m
    const refreshToken = createRefreshToken(payload); // Expires in 7d
    console.log(accessToken, "akses token");
    console.log(refreshToken, "refresh token");
    

    // Simpan Refresh Token di database untuk user ini
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }, // Asumsi ada kolom `refreshToken` di tabel `user`
    });

    return { user, accessToken, refreshToken }; // Kirim kedua token ke client
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordService = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email }
    });
    if (!user) throw new Error('email not found');

    const payload = {
      email: user.email
    };

    const templatePath = path.join(__dirname, '../../templates', 'forgot-password.hbs');
    const token = createToken(payload, '60m');
    const link = process.env.BASE_URL_WEB + `/forgot-password/${token}`;
    const dataEmail = {
      link,
      name: user.name
    }

    const templateSource = await fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(dataEmail);

    await transporter.sendMail({
      to: email,
      subject: 'Reset Password',
      html
    });

    return user
  } catch (error) {
    throw error;
  }
};

export const resetPasswordService = async (password: string, email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {email}
    });
    if (!user) throw new Error('user not found');
    const hashingPassword = await hashPassword(password)
    const newPassword = await prisma.user.update({
      where: {email}, data: {password: hashingPassword}
    });
    return newPassword
  } catch (error) {
    throw error;
  }
};

export const editUserService = async (body: User, id: number, file?: string) => {
  try {
    const { name, phone } = body;
    const theUser = await prisma.user.findUnique({
      where: { id }
    });
    if (!theUser) throw new Error('user not found');
    
    const avatar = file
    ? `${base_url}/public/avatar/${file}`
    : theUser!.avatar;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        phone,
        avatar
      }
    });

    const payload = {
      id: updatedUser.id,
      role: updatedUser.role,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone!
    };

    const token = createAccessToken(payload);
    return { updatedUser, token };
  } catch (error) {
    throw error;
  }
};

export const removePhoneService = async (id: number) => {
  try {
    const theUser = await prisma.user.findUnique({
      where: { id }
    });
    if (!theUser) throw new Error('user not found');
    if (!theUser.phone) throw new Error('number is already empty')
    const removePhone = await prisma.user.update({
      where: { id },
      data: { phone: null}
    })
    return removePhone
  } catch (error) {
    throw error
  }
};

export const removeAvatarService = async (id: number) => {
  try {
    const theUser = await prisma.user.findUnique({
      where: { id }
    });
    if (!theUser) throw new Error('user not found');
    if (!theUser.avatar) throw new Error('image has already been removed');
    const removeAvatar = await prisma.user.update({
      where: { id },
      data: { avatar: null }
    });
    return removeAvatar
  } catch (error) {
    throw error
  }
};