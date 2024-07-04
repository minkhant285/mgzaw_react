export class AppStorage {

    private tokenKey = "@mk/token";
    private themeKey = "@mk/basetheme";

    setTheme = (value: string) => {
        localStorage.setItem(this.themeKey, value);
    }

    getTheme = () => {
        return localStorage.getItem(this.themeKey) || 'default';
    }

    setToken = (value: string) => {
        localStorage.setItem(this.tokenKey, value);
    }

    getToken = () => {
        return localStorage.getItem(this.tokenKey) || '';
    }

    removeToken = () => {
        localStorage.removeItem(this.tokenKey);
    }
}
