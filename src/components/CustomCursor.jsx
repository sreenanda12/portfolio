import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [cursorState, setCursorState] = useState('default');
    const [isScrolling, setIsScrolling] = useState(false);
    const [ripples, setRipples] = useState([]);
    
    // Mouse coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configuration for the trailing effect
    const springConfig = { damping: 25, stiffness: 200 };
    const outlineX = useSpring(mouseX, springConfig);
    const outlineY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (!target || !(target instanceof Element)) return;
            
            const elementStyle = window.getComputedStyle(target);
            
            if (target.closest('a') || target.closest('nav')) {
                setCursorState('link');
            } else if (target.closest('button') || target.tagName === 'BUTTON') {
                setCursorState('button');
            } else if (target.closest('.cert-card') || target.closest('.gallery-card') || target.closest('.marquee-card')) {
                setCursorState('view');
            } else if (elementStyle.cursor === 'pointer') {
                setCursorState('link');
            } else {
                setCursorState('default');
            }
        };

        const handleMouseDown = (e) => {
            setCursorState('click');
            const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
            setRipples(prev => [...prev, newRipple]);
            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== newRipple.id));
            }, 600);
        };

        const handleMouseUp = () => setCursorState('default');

        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => setIsScrolling(false), 500);
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [mouseX, mouseY]);

    const variants = {
        default: {
            width: 40,
            height: 40,
            backgroundColor: "rgba(231, 111, 46, 0)",
            border: "1.5px solid var(--accent-primary)",
        },
        link: {
            width: 60,
            height: 60,
            backgroundColor: "rgba(231, 111, 46, 0.15)",
            border: "1.5px solid var(--accent-primary)",
            scale: 1.1
        },
        button: {
            width: 50,
            height: 50,
            backgroundColor: "rgba(231, 111, 46, 0.1)",
            border: "1.5px solid var(--accent-primary)",
            scale: 1.2
        },
        view: {
            width: 80,
            height: 80,
            backgroundColor: "var(--accent-primary)",
            border: "none",
        },
        click: {
            scale: 0.8,
            width: 30,
            height: 30
        }
    };

    return (
        <div className="custom-cursor-container">
            {/* Click Ripples */}
            {ripples.map(ripple => (
                <motion.div
                    key={ripple.id}
                    className="cursor-ripple"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                    }}
                />
            ))}

            {/* Main trailing outline */}
            <motion.div
                className={`cursor-outline ${cursorState === 'link' ? 'hovering-link' : ''} ${cursorState === 'view' ? 'hovering-view' : ''} ${isScrolling ? 'scrolling' : ''}`}
                style={{
                    left: outlineX,
                    top: outlineY,
                }}
                animate={cursorState}
                variants={variants}
                transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
            >
                {cursorState === 'view' && (
                    <span className="cursor-text">VIEW</span>
                )}
                {isScrolling && cursorState === 'default' && (
                    <div className="scroll-indicator-arrows">
                        <div className="arrow-up"></div>
                        <div className="arrow-down"></div>
                    </div>
                )}
            </motion.div>

            {/* Tight center dot */}
            <motion.div
                className="cursor-dot"
                style={{
                    left: mouseX,
                    top: mouseY,
                }}
            />
        </div>
    );
};

export default CustomCursor;
