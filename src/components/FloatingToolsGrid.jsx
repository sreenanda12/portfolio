import React, { useEffect, useRef, useMemo } from 'react';
import './FloatingToolsGrid.css';

const TOOLS_DATA = [
    // LAYER 1: FRONT (Bigger, Faster, Closer)
    { id: 'ps', name: 'Photoshop', label: 'Ps', color: '#D88A05', layer: 0, x: 10, y: 20 },
    { id: 'figma', name: 'Figma', label: '', color: '#F24E1E', layer: 0, x: 75, y: 15 },
    { id: 'ai', name: 'Illustrator', label: 'Ai', color: '#FF9A00', layer: 0, x: 25, y: 70 },
    { id: 'code', name: 'Code', label: '</>', color: '#D88A05', layer: 0, x: 80, y: 75 },

    // LAYER 2: MIDDLE (Normal)
    { id: 'pr', name: 'Premiere Pro', label: 'Pr', color: '#B87404', layer: 1, x: 45, y: 10 },
    { id: 'xd', name: 'Adobe XD', label: 'Xd', color: '#F2A93B', layer: 1, x: 15, y: 45 },
    { id: 'unity', name: 'Unity', label: '', color: '#2C2924', layer: 1, x: 85, y: 45 },
    { id: 'unreal', name: 'Unreal Engine', label: 'u', color: '#2C2924', layer: 1, x: 50, y: 85 },

    // LAYER 3: BACK (Smaller, Slower, Lower Opacity)
    { id: 'wp', name: 'WordPress', label: 'W', color: '#8E8A83', layer: 2, x: 55, y: 40 },
    { id: 'blender', name: 'Blender', label: '', color: '#EA7600', layer: 2, x: 35, y: 35 },
    { id: 'office', name: 'Microsoft Office', label: '', color: '#EB3C00', layer: 2, x: 65, y: 65 },
];

const ToolIcon = ({ tool }) => {
    // Icons provided based on descriptions
    const renderIcon = () => {
        switch (tool.id) {
            case 'figma':
                return (
                    <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon">
                        <path d="M19 28.5C19 25.0192 20.4092 21.6811 22.9175 19.2197C25.4258 16.7583 28.8272 15.375 32.3733 15.375C35.9195 15.375 39.3208 16.7583 41.8292 19.2197C44.3375 21.6811 45.7467 25.0192 45.7467 28.5V41.625C45.7467 45.1058 44.3375 48.4439 41.8292 50.9053C39.3208 53.3667 35.9195 54.75 32.3733 54.75C28.8272 54.75 25.4258 53.3667 22.9175 50.9053C20.4092 48.4439 19 45.1058 19 41.625" fill="#1ABCFE"/>
                        <path d="M0 41.625C0 38.1442 1.40915 34.8061 3.91751 32.3447C6.42587 29.8833 9.82718 28.5 13.3733 28.5H19V41.625C19 45.1058 17.5908 48.4439 15.0825 50.9053C12.5741 53.3667 9.17282 54.75 5.62667 54.75C2.08051 54.75 -1.3208 53.3667 -3.82916 50.9053C-6.33751 48.4439 -7.7467 45.1058 -7.7467 41.625" fill="#0ACF83"/>
                        <path d="M0 15.375C0 11.8942 1.40915 8.55611 3.91751 6.09471C6.42587 3.63332 9.82718 2.25 13.3733 2.25H19V15.375H13.3733C9.82718 15.375 6.42587 14.125 3.91751 11.875C1.40915 9.625 0 2.25 0 2.25" fill="#A259FF"/>
                        <path d="M19 2.25H32.3733C35.9195 2.25 39.3208 3.66668 41.8292 6.18751C44.3375 8.70834 45.7467 12.1891 45.7467 15.67V28.9208H19V2.25Z" fill="#F24E1E"/>
                        <path d="M19 28.5H32.3733C35.9195 28.5 39.3208 29.9167 41.8292 32.4375C44.3375 34.9583 45.7467 38.4391 45.7467 41.92V41.9208H19V28.5Z" fill="#FF7262"/>
                    </svg>
                );
            case 'unity':
                return (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="svg-icon">
                        <path d="M12 0l-10 6v12l10 6 10-6v-12l-10-6zm-8 7.3l8-4.8 8 4.8v9.4l-8 4.8-8-4.8v-9.4zM12 5.5l-6 3.6v5.8l6 3.6 6-3.6v-5.8l-6-3.6z"/>
                    </svg>
                );
            case 'blender':
                return (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="svg-icon">
                        <path d="M18.66 10.42a4.42 4.42 0 10-4.42 4.42c1.7 0 3.2-.96 3.93-2.38l.49.52c.8 1.45 2.3 2.44 4.02 2.44a4.67 4.67 0 10-4.67-4.67c0 .1.02.2.03.3l-.38-.63zM12.3 10.42a1.95 1.95 0 113.9 0 1.95 1.95 0 01-3.9 0z"/>
                    </svg>
                );
            case 'office':
                return (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="svg-icon">
                        <path d="M1.5 6.5l9-3.5 12 3.5v11l-12 3.5-9-3.5v-11zm10.5 1l6 2v7l-6 2v-11zm-1.5 9v-8l-5.5 2v4l5.5 2z"/>
                    </svg>
                );
            case 'wp':
                return (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="svg-icon">
                        <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zM3.5 12a8.4 8.4 0 011.1-4.2l5.5 15.1A8.5 8.5 0 013.5 12zm8.6 8.5L7.7 8.3c1-.2 2.3-.2 3.3 0l4.3 12.2a8.5 8.5 0 01-3.2 0zm5.1-6.1l-2.7-7.3A8.4 8.4 0 0120.5 12a8.5 8.5 0 01-.1 2.4H17.2zM12 4a8 8 0 015.4 2.1c-.1 0-.3.1-.4.1-.7 0-1.2-.6-1.2-1.3 0-.1 0-.2.1-.3A8.4 8.4 0 0012 4z"/>
                    </svg>
                );
            case 'unreal':
                return (
                    <span className="icon-label-u">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="svg-icon">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v10h-2V7z"/>
                        </svg>
                    </span>
                );
            default:
                return tool.label && <span className="icon-text">{tool.label}</span>;
        }
    };

    return (
        <div className={`tool-card-outer layer-${tool.layer}`}>
            <div className="tool-card-inner" style={{ '--tool-color': tool.color }}>
                {renderIcon()}
            </div>
            <span className="tool-name-hint">{tool.name}</span>
        </div>
    );
};

const FloatingToolsGrid = () => {
    const containerRef = useRef(null);
    const requestRef = useRef();
    const mousePos = useRef({ x: 0, y: 0 });
    const targetMousePos = useRef({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalize mouse pos to -1 to 1
        targetMousePos.current = {
            x: (clientX / innerWidth) * 2 - 1,
            y: (clientY / innerHeight) * 2 - 1
        };
    };

    const animate = () => {
        // Smooth interpolation for parallax
        mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.05;
        mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.05;

        if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll('.tool-card-outer');
            elements.forEach((el, index) => {
                const tool = TOOLS_DATA[index];
                const layerFactor = (3 - tool.layer) * 15; // Front layer moves more
                
                const parallaxX = mousePos.current.x * layerFactor;
                const parallaxY = mousePos.current.y * layerFactor;

                // Combine parallax with base position
                el.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0)`;
            });
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Randomize initial floating delays and durations for each icon
    const randomizedTools = useMemo(() => {
        return TOOLS_DATA.map((tool, index) => ({
            ...tool,
            floatDuration: 4 + Math.random() * 4, // 4s to 8s
            floatDelay: Math.random() * -5, // Random start point
            scaleDuration: 3 + Math.random() * 3, // 3s to 6s
            rotationDegree: -15 + Math.random() * 30, // -15 to 15 deg
        }));
    }, []);

    return (
        <div className="premium-tools-scene" ref={containerRef}>
            {randomizedTools.map((tool, index) => (
                <div 
                    key={tool.id} 
                    className={`tool-position-wrapper layer-${tool.layer}`}
                    style={{
                        left: `${tool.x}%`,
                        top: `${tool.y}%`,
                        '--float-dur': `${tool.floatDuration}s`,
                        '--float-del': `${tool.floatDelay}s`,
                        '--scale-dur': `${tool.scaleDuration}s`,
                        '--rot-deg': `${tool.rotationDegree}deg`,
                    }}
                >
                    <ToolIcon tool={tool} />
                </div>
            ))}
        </div>
    );
};

export default FloatingToolsGrid;
