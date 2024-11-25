import { createToken } from '@/helpers/createToken';
import { hashPassword } from '@/helpers/hashPassword';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';
import { compare } from 'bcrypt';

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
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) throw new Error('user not found');

    if (!user.isVerified)
      throw new Error('user not verified');

    const isValidPass = await compare(password!, user.password!);
    if (!isValidPass)
      throw new Error(
        'incorrect password',
      );

    const payload = {
      id: user.id,
      role: user.role,
      email: user.email
    };

    const token = createToken(payload, '1d');

    return { user, token };
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
      id: user.id,
      role: user.role,
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

export const resetPasswordService = async (password: string, userId: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: {id: userId}
    });
    if (!user) throw new Error('user not found');
    const hashingPassword = await hashPassword(password)
    const newPassword = await prisma.user.update({
      where: {id: userId}, data: {password: hashingPassword}
    });
    return newPassword
  } catch (error) {
    throw error;
  }
}