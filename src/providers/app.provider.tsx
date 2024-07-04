// src/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { IUser } from '../models';
import { AppStorage } from '../utils';

export const AppContext = createContext<{
    theme: string;
    appLoading: boolean;
    token: string | undefined;
    userInfo: IUser | undefined;
    toggleTheme: (themeVal: string) => void;
    loadingControl: (val: boolean) => void;
    saveAuth: (token: string, info: IUser | undefined) => void;
    logout: () => void;
    saveUserInfo: (info: IUser) => void;
}>({
    theme: 'default',
    appLoading: false,
    token: undefined,
    userInfo: undefined,
    saveAuth: () => { },
    logout: () => { },
    saveUserInfo: () => { },
    toggleTheme: () => { },
    loadingControl: () => { }
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storage = new AppStorage();
    const [theme, setTheme] = useState(storage.getTheme());
    const [appLoading, setAppLoading] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(storage.getUserInfo());
    const [token, setToken] = useState(storage.getToken());


    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme, appLoading]);

    return (
        <AppContext.Provider value={{
            theme,
            userInfo: user,
            token,
            appLoading,
            saveAuth: (token: string, userInfo: IUser | undefined) => {
                setToken(token);
                storage.setToken(token);
                setUser(userInfo);
                storage.setUserInfo(userInfo);
            },
            logout: () => {
                storage.removeToken();
                setToken('');
                storage.setUserInfo(undefined);
                setUser(undefined);
            },
            toggleTheme: (themeVal: string) => {
                setTheme(themeVal);
                storage.setTheme(themeVal)
            },
            loadingControl: (val: boolean) => {
                setAppLoading(val);
            },
            saveUserInfo: (userInfo: IUser | undefined) => {
                setUser(userInfo);
                storage.setUserInfo(userInfo);
            }
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useTheme = () => useContext(AppContext);
