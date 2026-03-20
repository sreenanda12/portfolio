import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [cursorState, setCursorState] = useState('default');
    const [clicks, setClicks] = useState([]);
    
    // Smooth mouse movement with high stiffness for NO lag
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 500, mass: 0.1 }; // Fast and snappy
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (!target || !(target instanceof Element)) return;
            
            if (target.closest('a') || target.closest('button') || target.tagName === 'BUTTON') {
                setCursorState('hover');
            } else {
                setCursorState('default');
            }
        };

        const handleMouseDown = (e) => {
            setCursorState('click');
            const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
            setClicks(prev => [...prev, newClick]);
            setTimeout(() => {
                setClicks(prev => prev.filter(c => c.id !== newClick.id));
            }, 600);
        };

        const handleMouseUp = () => setCursorState('default');

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="custom-cursor-layer">
            {/* CLICK RIPPLE ANIMATIONS */}
            <AnimatePresence>
                {clicks.map(click => (
                    <motion.div
                        key={click.id}
                        className="click-ripple"
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                            left: click.x,
                            top: click.y,
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* THE MAIN CURSOR (Circle + Arrow) */}
            <motion.div
                className="main-cursor"
                style={{
                    left: cursorX,
                    top: cursorY,
                }}
                animate={{
                    scale: cursorState === 'hover' ? 1.4 : 1,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
                <div className="cursor-ring"></div>
                <div className="cursor-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </div>
            </motion.div>
        </div>
    );
};

export default CustomCursor;
