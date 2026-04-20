import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

/**
 * UNIFIED PREMIUM CURSOR
 * Fixes: Double-cursor effect, movement lag, and detached ring.
 * Features: Single-unit movement, centered arrow, premium click pulse.
 */
const CustomCursor = () => {
    const cursorRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 1. Desktop Check & Global Cursor Hide
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia("(pointer: coarse)").matches);
        if (isTouchDevice) {
            document.body.classList.add('touch-device');
            return;
        }

        // Apply cursor: none globally to everything
        const style = document.createElement('style');
        style.innerHTML = `
            * { cursor: none !important; }
            html, body { cursor: none !important; }
        `;
        document.head.appendChild(style);

        const onMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        const onMouseOver = (e) => {
            const target = e.target.closest('a, button, [role="button"], .interactive, .st-tool-card, .premium-card, .cert-card, .filter-marquee-pill, .nav-links');
            if (target) setIsHovering(true);
            else setIsHovering(false);
        };

        const animate = () => {
            // Smooth unified lerp for the entire unit
            pos.current.x += (mouse.current.x - pos.current.x) * 0.25;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.25;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            }
            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseenter', () => setIsVisible(true));
        document.addEventListener('mouseleave', () => setIsVisible(false));

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', onMouseOver);
            cancelAnimationFrame(animId);
            document.head.removeChild(style);
        };
    }, []);

    if (typeof window !== 'undefined' && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))) return null;

    return (
        <div 
            ref={cursorRef} 
            className={`cursor-unified-unit ${isVisible ? 'is-visible' : ''} ${isHovering ? 'is-hovering' : ''} ${isClicking ? 'is-clicking' : ''}`}
        >
            <div className="cursor-ring"></div>
            <div className="cursor-arrow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path 
                        d="M5.5 3.21V20.8L10.18 16.12L13.3 22.39L16.22 20.93L13.1 14.66H18.99L5.5 3.21Z" 
                        fill="#F45A0B" 
                        stroke="white"
                        strokeWidth="0.5"
                    />
                </svg>
            </div>
            <div className="cursor-glow-burst"></div>
        </div>
    );
};

export default CustomCursor;
