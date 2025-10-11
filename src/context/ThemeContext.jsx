import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'theme';

const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => {},
    toggleTheme: () => {}
});

function getInitialTheme() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') 
            return stored;
    } 
    catch {}

    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } 
        catch {}
        
        const root = document.documentElement;

        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } 
        else {
            root.removeAttribute('data-theme');
        }
    }, [theme]);

    // Optional: respond to system changes if user hasn’t explicitly chosen
    useEffect(() => {
        if (!window.matchMedia) 
            return;

        const mql = window.matchMedia('(prefers-color-scheme: dark)');

        const handler = (e) => {
            const stored = (() => {
                try { 
                    return localStorage.getItem(STORAGE_KEY); 
                }
                catch { 
                    return null; 
                }
            })();
            
            if (!stored) setTheme(e.matches ? 'dark' : 'light');
        };

        mql.addEventListener?.('change', handler);
        return () => mql.removeEventListener?.('change', handler);
    }, []);

    const value = useMemo(() => ({
        theme,
        setTheme,
        toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    }), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}