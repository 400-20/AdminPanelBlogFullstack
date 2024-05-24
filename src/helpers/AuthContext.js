"use client"


import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);
    }, []);

    const login = (token) => {
        Cookies.set('token', token, { expires: 1, path: '/' });
        setIsLoggedIn(true);
    };

    const logout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
