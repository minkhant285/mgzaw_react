import { IUser } from "./user.model";

export const enum STATUS_MESSAGE {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL'
}

export interface IReturnPayload {
    status_code: number;
    status_message: STATUS_MESSAGE;
    message: string;
    result?: Object | null;
    error?: unknown;
}

export interface LoginResult extends Omit<IReturnPayload, 'data'> {
    result: { token: string }
}

export interface UserInfoResult extends Omit<IReturnPayload, 'data'> {
    result: IUser
}
