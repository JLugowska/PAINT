import {useEffect, useRef, useCallback, useState} from "react";

export const useClickOutside = (handler) => {
    const ref = useRef(null);

    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        return () => document.removeEventListener('mousedown', listener);
    }, [handler]);

    return ref;
};


export const useDarkMode = (options = {}) => {
    const {
        threshold = 90,
        storageKey = 'darkMode',
        className = 'dark-mode',
        element = document.body
    } = options;

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check local storage first
        const savedMode = localStorage.getItem(storageKey);
        if (savedMode !== null) {
            return JSON.parse(savedMode);
        }
        // Default to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const [power, setPower] = useState(0);

    // Toggle function
    const toggleDarkMode = useCallback(() => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            localStorage.setItem(storageKey, JSON.stringify(newValue));
            return newValue;
        });
    }, [storageKey]);

    // Update based on power threshold
    const updateFromPower = useCallback((newPower) => {
        setPower(newPower);
        if (newPower > threshold) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, [threshold]);

    // Apply dark mode class
    useEffect(() => {
        if (isDarkMode) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }

        return () => {
            element.classList.remove(className);
        };
    }, [isDarkMode, className, element]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (localStorage.getItem(storageKey) === null) {
                setIsDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [storageKey]);

    return {
        isDarkMode,
        toggleDarkMode,
        updateFromPower,
        power
    };
};
