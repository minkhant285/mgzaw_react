// src/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { IUser } from '../models';
import { AppStorage } from '../utils';

export const ThemeContext = createContext<{
    theme: string;
    appLoading: boolean;
    token: string;
    userInfo: IUser | {};
    toggleTheme: (themeVal: string) => void;
    loadingControl: (val: boolean) => void;
    saveToken: (token: string) => void;
    removeToken: () => void;
    saveUserInfo: (info: IUser) => void;
}>({
    theme: 'default',
    appLoading: false,
    token: '',
    userInfo: {},
    saveToken: () => { },
    removeToken: () => { },
    saveUserInfo: () => { },
    toggleTheme: () => { },
    loadingControl: () => { }
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storage = new AppStorage();
    const [theme, setTheme] = useState(storage.getTheme());
    const [appLoading, setAppLoading] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState(storage.getToken());


    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme, appLoading]);

    return (
        <ThemeContext.Provider value={{
            theme,
            userInfo: user,
            token,
            appLoading,
            saveToken: (token: string) => {
                console.log("saved token", token)
                setToken(token);
                storage.setToken(token);

            },
            removeToken: () => {
                storage.removeToken();
                setToken('');
                setUser({});
            },
            toggleTheme: (themeVal: string) => {
                setTheme(themeVal);
                storage.setTheme(themeVal)
            },
            loadingControl: (val: boolean) => {
                setAppLoading(val);
            },
            saveUserInfo: (userInfo: IUser) => {
                setUser(userInfo);
            }
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
