import { createToken } from '@/helpers/createToken';
import { hashPassword } from '@/helpers/hashPassword';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';
import { compare } from 'bcrypt';
import { generateOtp } from '@/helpers/otpGenerate';

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

    // const templatePath = path.join(__dirname, '../../templates', 'verify.hbs');
    const templatePath = path.join(__dirname, '../../../src/templates', 'verify.hbs');

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

export const verifyUserService = async (id: string) => {
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
    const accessToken = createToken(payload, '1d');

    return { user, accessToken };
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

    const templatePath = path.join(__dirname, '../../../src/templates', 'forgot-password.hbs');
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

export const editUserService = async (body: User, id: string, file?: string) => {
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

    const token = createToken(payload, '1d');
    return { updatedUser, token };
  } catch (error) {
    throw error;
  }
};

export const removePhoneService = async (id: string) => {
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

export const removeAvatarService = async (id: string) => {
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

export const changePasswordService = async (id: string, oldPass: string, newPass: string) => {
  try {
    const now = new Date()
    const theUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!theUser) throw new Error('user not found');
    if (theUser.changePasswordExpired && now.getTime() - theUser.changePasswordExpired.getTime() < 24 * 60 * 60 * 1000) throw new Error("you changed your password too frequent")
    const isValidPass = await compare(oldPass, theUser.password)
    if(!isValidPass) throw new Error("old password is incorect")

    const hashNewPass = await hashPassword(newPass)

    const newPassword = await prisma.user.update({
      where: { id },
      data: {
        password: hashNewPass,
        changePasswordExpired: new Date()
      }
    }) 

    return newPassword
  } catch (error) {
    throw error
  }
}

export const sendVerificationChangeMailService = async (email: string) => {
  try {
    const now = new Date()
    const theUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!theUser) throw new Error('user not found');
    if (theUser.changeEmailExpired && now.getTime() - theUser.changeEmailExpired.getTime() < 24 * 60 * 60 * 1000) throw new Error('you changed your email too frequently')
    const { otp } =  generateOtp(email)
    const otpExpired = new Date()
    otpExpired.setMinutes(otpExpired.getMinutes() + 2)

    const newOtp = await prisma.user.update({
      where: {email},
      data:{
        otp,
        otpExpired
      }
    })

    const dataMail = {
      otp: newOtp.otp
    }

    const templatePath = path.join(__dirname, '../../../src/templates', 'otp.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(dataMail);

    await transporter.sendMail({
      to: email,
      subject: "Verification Code",
      html
    })

    return newOtp
  } catch (error) {
    throw error
  }
}

export const verificationOtpService = async (email: string, otp: string) => {
  try {
    const theUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!theUser) throw new Error('user not found');
    if(theUser.otpExpired && new Date() > theUser.otpExpired) throw new Error("otp code has expired");
    if (otp !== theUser.otp) throw new Error("invalid otp code");

    const newData = await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otp: null,
        otpExpired: null
      }
    })

    return newData;
  } catch (error) {
    throw error
  }
}

export const changeEmailService = async (email: string, newMail: string) => {
  try {
    const theUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!theUser) throw new Error('user not found');
    const existingUser = await prisma.user.findUnique({
      where: { email: newMail },
    });

    if (existingUser) throw new Error('email already exists');
    
    const newEmail = await prisma.user.update({
      where: { email },
      data: {
        email: newMail,
        changeEmailExpired: new Date()
      }
    });

    const payload = {
      id: newEmail.id,
      role: newEmail.role,
      email: newEmail.email,
    };

    const token = createToken(payload, '1d')

    return { newEmail, token }
  } catch (error) {
    throw error
  }
}