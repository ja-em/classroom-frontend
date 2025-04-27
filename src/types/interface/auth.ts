import { Session, User } from "next-auth";

export interface IUser extends User {
  accessToken: string;
  refreshToken: string;
}

export interface ISession extends Session {
  accessToken: string;
  refreshToken: string;
  expiredIn: number; // seconds
}
