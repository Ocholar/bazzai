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
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            // Check local storage (legacy/dev)
            const localAuth = localStorage.getItem('auth');
            if (localAuth === 'true') {
                setIsAuthenticated(true);
                return;
            }

            // Check cookie (production/oauth)
            const cookies = parse(document.cookie || '');
            if (cookies[COOKIE_NAME]) {
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, []);

    const login = (password: string) => {
        // Simple hardcoded password for now
        if (password === 'admin123') {
            localStorage.setItem('auth', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('auth');
        // Clear cookie by setting it to expire in the past
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
