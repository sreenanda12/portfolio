import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

/**
 * OPTIMIZED HIGH-PERFORMANCE CURSOR
 * Focus: 60fps smoothness, zero lag, minimal DOM updates.
 */
const CustomCursor = () => {
    const ringRef = useRef(null);
    const arrowRef = useRef(null);
    const auraRef = useRef(null);
    const wrapperRef = useRef(null);
    
    // Animation Frame Tracking
    const requestRef = useRef();
    
    // Motion State
    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });      // Inner Arrow pos
    const ringPos = useRef({ x: 0, y: 0 });  // Outer Ring pos
    const vel = useRef({ x: 0, y: 0 });
    
    // Interaction Refs (to avoid re-attaching listeners)
    const isVisible = useRef(false);
    const isHovering = useRef(false);
    const isAnticipating = useRef(false);
    const activeTarget = useRef(null);

    useEffect(() => {
        // Detect touch device once
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia("(pointer: coarse)").matches);
        if (isTouchDevice) {
            document.body.classList.add('touch-device');
            return; // Exit if mobile
        }

        const onMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!isVisible.current) {
                isVisible.current = true;
                if (wrapperRef.current) wrapperRef.current.classList.add('is-visible');
            }
        };

        const createRipple = (x, y) => {
            const container = document.querySelector('.cursor-ripple-container');
            if (!container) return;

            const ripple = document.createElement('div');
            ripple.className = 'cursor-click-ripple';
            ripple.style.transform = `translate3d(${x}px, ${y}px, 0)`; // Performance
            
            container.appendChild(ripple);
            setTimeout(() => ripple.remove(), 800);
        };

        const onMouseDown = (e) => {
            createRipple(e.clientX, e.clientY);
            setTimeout(() => createRipple(e.clientX, e.clientY), 80);
        };

        const handleHover = (e) => {
            const target = e.target.closest('a, button, [role="button"], .interactive');
            if (target) {
                activeTarget.current = target;
                if (!isHovering.current) {
                    isAnticipating.current = true;
                    setTimeout(() => {
                        isAnticipating.current = false;
                        isHovering.current = true;
                        if (wrapperRef.current) wrapperRef.current.classList.add('is-hovering');
                    }, 80);
                }
            } else {
                activeTarget.current = null;
                isHovering.current = false;
                if (wrapperRef.current) wrapperRef.current.classList.remove('is-hovering');
            }
        };

        const animate = () => {
            // physics calculation
            let targetX = mouse.current.x;
            let targetY = mouse.current.y;
            let friction = 0.15;

            if (activeTarget.current) {
                const rect = activeTarget.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distX = centerX - mouse.current.x;
                const distY = centerY - mouse.current.y;
                const distance = Math.hypot(distX, distY);

                if (distance < 80) {
                    const pullStrength = 1 - (distance / 80);
                    targetX = mouse.current.x + distX * pullStrength * 0.3;
                    targetY = mouse.current.y + distY * pullStrength * 0.3;
                    friction = 0.08;
                }
            }

            // Lerps
            pos.current.x += (targetX - pos.current.x) * 0.25;
            pos.current.y += (targetY - pos.current.y) * 0.25;

            ringPos.current.x += (targetX - ringPos.current.x) * friction;
            ringPos.current.y += (targetY - ringPos.current.y) * friction;

            // Velocity response
            const vx = targetX - pos.current.x;
            const vy = targetY - pos.current.y;
            const speed = Math.hypot(vx, vy);
            
            const stretchX = Math.min(speed * 0.005, 0.1);
            const stretchY = -stretchX;
            const angle = Math.atan2(vy, vx) * (180 / Math.PI);

            // Float depth
            const floatX = vx * 0.12;
            const floatY = vy * 0.12;

            // DOM Updates (RequestAnimationFrame ensures sync with refresh rate)
            if (ringRef.current) {
                let scale = 1;
                if (isAnticipating.current) scale = 0.95;
                else if (isHovering.current) scale = 1.45;

                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) rotate(${angle}deg) scale(${scale + stretchX}, ${scale + stretchY})`;
            }

            if (arrowRef.current) {
                const arrowScale = isHovering.current ? 1.1 : 1;
                arrowRef.current.style.transform = `translate3d(${pos.current.x + floatX}px, ${pos.current.y + floatY}px, 0) scale(${arrowScale})`;
            }

            if (auraRef.current) {
                auraRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', handleHover, { passive: true });
        window.addEventListener('mousedown', onMouseDown, { passive: true });
        document.addEventListener('mouseleave', () => {
            isVisible.current = false;
            if (wrapperRef.current) wrapperRef.current.classList.remove('is-visible');
        });
        document.addEventListener('mouseenter', () => {
            isVisible.current = true;
            if (wrapperRef.current) wrapperRef.current.classList.add('is-visible');
        });

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleHover);
            window.removeEventListener('mousedown', onMouseDown);
            cancelAnimationFrame(requestRef.current);
        };
    }, []); // Listener is attached only ONCE

    return (
        <div ref={wrapperRef} className="cursor-premium-wrapper">
            <div className="cursor-ripple-container"></div>
            <div ref={auraRef} className="cursor-aura"></div>
            <div ref={ringRef} className="cursor-ring-outer">
                <div className="ring-inner-line"></div>
            </div>
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
