import { sign } from 'jsonwebtoken';

interface IPayload {
  id?: number;
  email: string;
  role?: string;
}

const secret = process.env.SECRET_KEY || 'real madrid';

export const createToken = (payload: IPayload, expires: string) => {
  const token = sign(payload, secret, { expiresIn: expires });
  return token;
};

// Helper untuk Access Token
export const createAccessToken = (payload: IPayload) => {
  return createToken(payload, '15m');
};

// Helper untuk Refresh Token
export const createRefreshToken = (payload: IPayload) => {
  return createToken(payload, '7d');
};
