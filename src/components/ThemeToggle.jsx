import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
        >
            {theme === 'light' ? (
                <Moon className="theme-icon moon" />
            ) : (
                <Sun className="theme-icon sun" />
            )}
        </button>
    );
};

export default ThemeToggle;
