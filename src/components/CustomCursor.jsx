import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

/**
 * UNIFIED PREMIUM CURSOR
 * Features: Smooth lerp, velocity-based stretch, magnetic hover, click ripples, breathing glow.
 */
const CustomCursor = () => {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });
    const prevPos = useRef({ x: 0, y: 0 });
    const currentAngle = useRef(0);
    const hoverTarget = useRef(null);
    
    const visibleRef = useRef(false);
    const hoverRef = useRef(false);

    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia("(pointer: coarse)").matches);
        if (isTouchDevice) {
            document.body.classList.add('touch-device');
            return;
        }

        const style = document.createElement('style');
        style.innerHTML = `
            * { cursor: none !important; }
            html, body { cursor: none !important; }
        `;
        document.head.appendChild(style);

        const onMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            
            if (!visibleRef.current) {
                visibleRef.current = true;
                setIsVisible(true);
            }

            const target = e.target.closest('a, button, [role="button"], .interactive, .st-tool-card, .premium-card, .cert-card, .filter-marquee-pill, .nav-links, input, textarea');
            if (target) {
                if (!hoverRef.current) {
                    hoverRef.current = true;
                    setIsHovering(true);
                }
                hoverTarget.current = target;
            } else {
                if (hoverRef.current) {
                    hoverRef.current = false;
                    setIsHovering(false);
                }
                hoverTarget.current = null;
            }
        };

        const onMouseDown = (e) => {
            setIsClicking(true);
            const newRipple = { id: Date.now(), x: pos.current.x, y: pos.current.y };
            setRipples(prev => [...prev, newRipple]);
            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== newRipple.id));
            }, 600);
        };
        const onMouseUp = () => setIsClicking(false);

        const onMouseEnter = () => {
            visibleRef.current = true;
            setIsVisible(true);
        };
        const onMouseLeave = () => {
            visibleRef.current = false;
            setIsVisible(false);
        };

        const animate = () => {
            let targetX = mouse.current.x;
            let targetY = mouse.current.y;

            if (hoverTarget.current) {
                const rect = hoverTarget.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                // Magnetic pull: 15% toward center of the element
                targetX = mouse.current.x + (centerX - mouse.current.x) * 0.15;
                targetY = mouse.current.y + (centerY - mouse.current.y) * 0.15;
            }

            // Lerp position - 0.15 for premium delayed feel
            pos.current.x += (targetX - pos.current.x) * 0.15;
            pos.current.y += (targetY - pos.current.y) * 0.15;

            // Calculate velocity
            const dx = pos.current.x - prevPos.current.x;
            const dy = pos.current.y - prevPos.current.y;
            const velocity = Math.sqrt(dx * dx + dy * dy);

            // Calculate angle for rotation
            if (velocity > 0.5) {
                currentAngle.current = Math.atan2(dy, dx) * (180 / Math.PI);
            }

            // Smooth scale based on velocity
            // Stretch X, Compress Y
            const scaleX = 1 + Math.min(velocity * 0.015, 0.2); // max 1.2
            const scaleY = 1 - Math.min(velocity * 0.005, 0.1); // min 0.9

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `rotate(${currentAngle.current}deg) scale(${scaleX}, ${scaleY})`;
            }

            prevPos.current.x = pos.current.x;
            prevPos.current.y = pos.current.y;

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            cancelAnimationFrame(animId);
            document.head.removeChild(style);
        };
    }, []);

    if (typeof window !== 'undefined' && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))) return null;

    return (
        <>
            <div 
                ref={cursorRef} 
                className={`cursor-unified-unit ${isVisible ? 'is-visible' : ''} ${isHovering ? 'is-hovering' : ''} ${isClicking ? 'is-clicking' : ''}`}
            >
                {/* Breathing glow effect */}
                <div className="cursor-glow-bg"></div>

                {/* Velocity rotated & stretched container */}
                <div className="cursor-velocity-ring" ref={ringRef}>
                    <div className="cursor-ring"></div>
                </div>

                <div className="cursor-arrow">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path 
                            d="M5.5 3.21V20.8L10.18 16.12L13.3 22.39L16.22 20.93L13.1 14.66H18.99L5.5 3.21Z" 
                            fill="#FF8C42" 
                            stroke="white"
                            strokeWidth="0.5"
                        />
                    </svg>
                </div>
            </div>

            {/* Click Ripples */}
            {ripples.map(ripple => (
                <div 
                    key={ripple.id} 
                    className="cursor-water-ripple"
                    style={{ left: ripple.x, top: ripple.y }}
                />
            ))}
        </>
    );
};

export default CustomCursor;
