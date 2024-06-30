// src/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext<{
    theme: string;
    toggleTheme: (themeVal: string) => void;
}>({
    theme: 'default',
    toggleTheme: () => { }
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let savedTheme = localStorage.getItem("@mk/basetheme") || 'default';
    const [theme, setTheme] = useState(savedTheme);

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme: (themeVal: string) => {
                setTheme(themeVal);
                localStorage.setItem("@mk/basetheme", themeVal);
            }
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
