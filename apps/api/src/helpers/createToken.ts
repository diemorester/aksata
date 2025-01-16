import { sign } from 'jsonwebtoken';

interface IPayload {
  id?: string;
  email: string;
  role?: string;
  otp?: string;
}

const secret = process.env.SECRET_KEY || 'real madrid';

export const createToken = (payload: IPayload, expires: string) => {
  const token = sign(payload, secret, { expiresIn: expires });
  return token;
};

// Helper untuk Access Token
export const createAccessToken = (payload: IPayload) => {
  return createToken(payload, '1d');
};

// Helper untuk Refresh Token
export const createRefreshToken = (payload: IPayload) => {
  return createToken(payload, '7d');
};
