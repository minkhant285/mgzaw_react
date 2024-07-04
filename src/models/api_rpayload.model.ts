import { IUser } from "./user.model";

export interface IReturnPayload {
    status_code: number;
    message: string;
    data?: Object | null;
    error?: unknown;
}

export interface LoginResult extends Omit<IReturnPayload, 'data'> {
    data: { token: string }
}

export interface UserInfoResult extends Omit<IReturnPayload, 'data'> {
    data: IUser
}
