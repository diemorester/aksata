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