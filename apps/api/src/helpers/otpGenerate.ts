import { createToken } from './createToken';

export const generateOtp = (email: string) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex].toUpperCase();
  }
  const payload = {
    email,
    otp,
  };
  const token = createToken(payload, '1d');
  return { token, otp };
};
