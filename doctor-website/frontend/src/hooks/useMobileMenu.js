import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useMobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    // Close on route change
    useEffect(() => {
        close();
    }, [location]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return { isOpen, toggle, close };
};

export default useMobileMenu;
