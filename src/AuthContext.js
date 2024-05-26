import React, { createContext, useState, useEffect, useMemo } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : { username: null };
    });

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    const logOut = () => {
        setAuth({ username: null });
        localStorage.removeItem('auth');
    };

    const contextValue = useMemo(() => ({ auth, setAuth, logOut }), [auth]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};