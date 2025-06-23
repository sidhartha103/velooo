
'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (cb?: () => void) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        try {
            const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
            setIsAuthenticated(loggedIn);
        } catch (error) {
            console.error("Could not access localStorage", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = (callback?: () => void) => {
        setIsAuthenticated(true);
        try {
            localStorage.setItem('isAdminLoggedIn', 'true');
        } catch (error) {
             console.error("Could not access localStorage", error);
        }
        if (callback) callback();
    };

    const logout = () => {
        setIsAuthenticated(false);
        try {
            localStorage.removeItem('isAdminLoggedIn');
        } catch (error) {
             console.error("Could not access localStorage", error);
        }
        router.push('/admin/login');
    };
    
    const value = useMemo(() => ({ isAuthenticated, login, logout, isLoading }), [isAuthenticated, isLoading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
