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
