import React, { createContext, useState, useContext } from 'react';
import { IUser } from '../models';
import { AppStorage } from '../utils';

export const AppContext = createContext<{
    theme: string;
    appLoading: boolean;
    appError: boolean;
    appErrorMessage: string;
    categoryModal: boolean;
    searchModal: boolean;
    token: string | undefined;
    userInfo: IUser | undefined;
    isAuthenticated: boolean;
    toggleTheme: (themeVal: string) => void;
    loadingControl: (val: boolean) => void;
    saveAuth: (token: string, info: IUser | undefined) => void;
    logout: () => void;
    saveUserInfo: (info: IUser) => void;
    modalControl: (value: boolean) => void;
    searchModalControl: (value: boolean) => void;
    authStatusControl: (value: boolean) => void;
    appErrorControl: (value: boolean) => void;
    setErrorMessageControl: (value: string) => void;
}>({
    theme: 'default',
    appErrorMessage: '',
    appLoading: false,
    appError: false,
    categoryModal: false,
    searchModal: false,
    token: undefined,
    userInfo: undefined,
    isAuthenticated: false,
    saveAuth: () => { },
    logout: () => { },
    saveUserInfo: () => { },
    toggleTheme: () => { },
    loadingControl: () => { },
    modalControl: () => { },
    appErrorControl: () => { },
    searchModalControl: () => { },
    authStatusControl: () => { },
    setErrorMessageControl: () => { }
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storage = new AppStorage();
    const [theme, setTheme] = useState(storage.getTheme());
    const [appLoading, setAppLoading] = useState(false);
    const [appError, setAppError] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(storage.getUserInfo());
    const [token, setToken] = useState(storage.getToken());
    const [categoryModal, setCategoryModal] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [isAuthenticated, setAuth] = useState(false);
    const [appErrorMessage, setAppErrorMessage] = useState('');

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme, appLoading]);

    return (
        <AppContext.Provider value={{
            theme,
            isAuthenticated,
            userInfo: user,
            token,
            appLoading,
            appError,
            categoryModal,
            searchModal,
            appErrorMessage,
            authStatusControl: (value: boolean) => {
                setAuth(value);
            },
            searchModalControl: (value: boolean) => {
                setSearchModal(value);
            },
            modalControl: (value: boolean) => {
                setCategoryModal(value);
            },
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
            setErrorMessageControl: (val: string) => {
                setAppErrorMessage(val);
            },
            appErrorControl: (val: boolean) => {
                setAppError(val);
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
