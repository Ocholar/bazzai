import React, { createContext, useContext, useState, useEffect } from 'react';
import { parse } from 'cookie';
import { COOKIE_NAME } from '@/const';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Initialize state synchronously to avoid redirect loops
        if (typeof window !== 'undefined') {
            const localAuth = localStorage.getItem('auth');
            if (localAuth === 'true') return true;

            const cookies = parse(document.cookie || '');
            if (cookies[COOKIE_NAME]) return true;
        }
        return false;
    });

    useEffect(() => {
        const checkAuth = () => {
            const localAuth = localStorage.getItem('auth');
            const cookies = parse(document.cookie || '');
            const authed = localAuth === 'true' || !!cookies[COOKIE_NAME];
            if (authed !== isAuthenticated) {
                setIsAuthenticated(authed);
            }
        };

        // Check on focus/visibility change
        window.addEventListener('focus', checkAuth);
        return () => window.removeEventListener('focus', checkAuth);
    }, [isAuthenticated]);

    const login = (password: string) => {
        if (password === 'admin123') {
            localStorage.setItem('auth', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('auth');
        document.cookie = `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
