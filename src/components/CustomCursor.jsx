import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

/**
 * PREMIUM CUSTOM ANIMATED CURSOR
 * Inspired by Apple (macOS) and High-End Product UI.
 * Features: Layered Lerp, Liquid Ring, Floating Depth, Magnetic Interaction, Staggered Hover.
 */
const CustomCursor = () => {
    const ringRef = useRef(null);
    const arrowRef = useRef(null);
    const auraRef = useRef(null);
    
    // Animation Frame Tracking
    const requestRef = useRef();
    
    // Physics & Motion State (Using Refs for 60fps performance)
    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });      // Inner Arrow pos
    const ringPos = useRef({ x: 0, y: 0 });  // Outer Ring pos
    const vel = useRef({ x: 0, y: 0 });      // For stretching
    
    // Interaction States
    const [isHovering, setIsHovering] = useState(false);
    const [isAnticipating, setIsAnticipating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    // Ref-based state for the loop
    const isHoveringRef = useRef(false);
    const activeTarget = useRef(null);

    useEffect(() => {
        const onMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const onTouchStart = () => {
            document.body.classList.add('touch-device');
        };

        // Initial detection
        if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia("(pointer: coarse)").matches)) {
            document.body.classList.add('touch-device');
        }

        const createRipple = (x, y) => {
            const container = document.querySelector('.cursor-ripple-container');
            if (!container) return;

            const ripple = document.createElement('div');
            ripple.className = 'cursor-click-ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            container.appendChild(ripple);
            
            // Cleanup after animation
            setTimeout(() => {
                ripple.remove();
            }, 800);
        };

        const onMouseDown = (e) => {
            // Double Ripple logic: 2 rings staggered by 80ms
            createRipple(e.clientX, e.clientY);
            setTimeout(() => createRipple(e.clientX, e.clientY), 80);
        };

        const handleHover = (e) => {
            const target = e.target.closest('a, button, [role="button"], .interactive');
            if (target) {
                activeTarget.current = target;
                if (!isHoveringRef.current) {
                    // Step 5: Micro Anticipation before expansion
                    setIsAnticipating(true);
                    setTimeout(() => {
                        setIsAnticipating(false);
                        setIsHovering(true);
                        isHoveringRef.current = true;
                    }, 80); // Cinematic staggered delay
                }
            } else {
                activeTarget.current = null;
                setIsHovering(false);
                isHoveringRef.current = false;
            }
        };

        const animate = () => {
            // 1. MAGNETIC & FRICTION CALCULATION
            let targetX = mouse.current.x;
            let targetY = mouse.current.y;
            let friction = 0.15; // Smooth lag for ring

            if (activeTarget.current) {
                const rect = activeTarget.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distX = centerX - mouse.current.x;
                const distY = centerY - mouse.current.y;
                const distance = Math.hypot(distX, distY);

                // MAGNETIC PULL (Gently attract within radius)
                const attractionRadius = 80;
                if (distance < attractionRadius) {
                    const pullStrength = 1 - (distance / attractionRadius);
                    targetX = mouse.current.x + distX * pullStrength * 0.3;
                    targetY = mouse.current.y + distY * pullStrength * 0.3;
                    
                    // FRICTION: Slower motion near targets for tactile feel
                    friction = 0.08;
                }
            }

            // 2. LAYERED LERP (Different speeds for depth)
            // Arrow handles faster tracking
            pos.current.x += (targetX - pos.current.x) * 0.25;
            pos.current.y += (targetY - pos.current.y) * 0.25;

            // Ring handles smooth trailing tracking
            ringPos.current.x += (targetX - ringPos.current.x) * friction;
            ringPos.current.y += (targetY - ringPos.current.y) * friction;

            // 3. VELOCITY-BASED RESPONSE
            const vx = targetX - pos.current.x;
            const vy = targetY - pos.current.y;
            const speed = Math.hypot(vx, vy);
            
            // LIQUID RING (Stretch based on speed)
            const stretchX = Math.min(speed * 0.005, 0.1);
            const stretchY = -stretchX; // Stretch and squash logic
            const angle = Math.atan2(vy, vx) * (180 / Math.PI);

            // 4. INNER ARROW FLOATING DEPTH
            const floatX = vx * 0.15; // Arrow shifts slightly relative to movement
            const floatY = vy * 0.15;

            // 5. DOM UPDATES (Vanilla performance)
            if (ringRef.current) {
                // Determine scale based on state
                let scale = 1;
                if (isAnticipating) scale = 0.95;
                else if (isHoveringRef.current) scale = 1.45;

                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) rotate(${angle}deg) scale(${scale + stretchX}, ${scale + stretchY})`;
            }

            if (arrowRef.current) {
                const arrowScale = isHoveringRef.current ? 1.1 : 1;
                // Move arrow relative to center based on float depth
                const finalX = pos.current.x + floatX;
                const finalY = pos.current.y + floatY;
                arrowRef.current.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) scale(${arrowScale})`;
            }

            if (auraRef.current) {
                auraRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', handleHover);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('touchstart', onTouchStart);
        document.addEventListener('mouseleave', () => setIsVisible(false));
        document.addEventListener('mouseenter', () => setIsVisible(true));

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleHover);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('touchstart', onTouchStart);
            cancelAnimationFrame(requestRef.current);
        };
    }, [isVisible, isAnticipating]);

    return (
        <div className={`cursor-premium-wrapper ${isHovering ? 'is-hovering' : ''} ${isVisible ? 'is-visible' : ''}`}>
            {/* CLICK RIPPLE LAYER */}
            <div className="cursor-ripple-container"></div>
            
            {/* SOFT LIGHT AURA (Radial Glow) */}
            <div ref={auraRef} className="cursor-aura"></div>

            {/* OUTER CIRCULAR RING (Orange) */}
            <div ref={ringRef} className="cursor-ring-outer">
                <div className="ring-inner-line"></div>
            </div>
            
            {/* INNER ARROW POINTER (Mac-style) */}
            <div ref={arrowRef} className="cursor-arrow-inner">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path 
                        d="M5.5 3.21V20.8L10.18 16.12L13.3 22.39L16.22 20.93L13.1 14.66H18.99L5.5 3.21Z" 
                        fill="#D88A05" 
                        stroke="white"
                        strokeWidth="0.5"
                    />
                </svg>
            </div>
        </div>
    );
}


export default CustomCursor;

