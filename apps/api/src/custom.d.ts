type User = {
  id: string;
  role: string;
  email: string;
};
declare namespace Express {
  export interface Request {
    user?: User;
  }
}
