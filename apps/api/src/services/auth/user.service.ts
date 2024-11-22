import { createToken } from '@/helpers/createToken';
import { hashPassword } from '@/helpers/hashPassword';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';

export const RegisterUserService = async (body: User) => {
  try {
    const { name, email, password } = body;
    const userName = await prisma.user.findFirst({ where: { name }})
    const userEmail = await prisma.user.findFirst({ where: { email }})

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

    if (user?.isVerified) throw new Error('User has been verified');

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
