import { useState, useEffect } from 'react';

const useScrolled = (threshold = 50) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > threshold);
        };

        window.addEventListener('scroll', onScroll);

        // Check initial position
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return scrolled;
};

export default useScrolled;
