import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Settings() {
    const { theme, setTheme, toggleTheme } = useTheme();

    return (
        <div className="page-wrapper">
            {/* Simple toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label htmlFor="dark-mode-toggle" style={{ color: 'var(--text-1)' }}>Dark mode</label>
                <input
                    id="dark-mode-toggle"
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                />
            </div>
        </div>
    );
}

export default Settings;