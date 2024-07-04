import { IUser } from "../models";

export class AppStorage {

    private tokenKey = "@mk/token";
    private themeKey = "@mk/basetheme";
    private userinfoKey = "@mk/baseuser";

    setTheme = (value: string) => {
        localStorage.setItem(this.themeKey, value);
    }

    setUserInfo = (value: IUser | undefined) => {
        localStorage.setItem(this.userinfoKey, JSON.stringify(value));
    }

    getUserInfo = () => {
        let r = localStorage.getItem(this.userinfoKey);
        if (r !== 'undefined') {
            if (r !== null) {
                return JSON.parse(r || '') as IUser;
            }
        }
        return undefined;
    }

    getTheme = () => {
        return localStorage.getItem(this.themeKey) || 'default';
    }

    setToken = (value: string) => {
        localStorage.setItem(this.tokenKey, value);
    }

    getToken = () => {
        return localStorage.getItem(this.tokenKey) || undefined;
    }

    removeToken = () => {
        localStorage.removeItem(this.tokenKey);
    }
}
