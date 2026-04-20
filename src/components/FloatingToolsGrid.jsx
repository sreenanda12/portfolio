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
                    <svg width="40" height="40" viewBox="0 0 38 57" className="svg-icon svg-logo">
                        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
                        <path d="M0 47.5a9.5 9.5 0 0 1 9.5-9.5H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
                        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
                        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
                        <path d="M0 28.5a9.5 9.5 0 0 0 9.5 9.5H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
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
                    <svg viewBox="-30 -30 320 320" className="svg-icon svg-logo microsoft-logo-adjust logo-microsoft-office" xmlns="http://www.w3.org/2000/svg">
                        <path d="M208.5 31.3L111.4 0L42.5 31.3V186.7L111.4 218L208.5 186.7V31.3Z" fill="#EB3C00"/>
                        <path d="M111.4 53.6L42.5 84.9V186.7L111.4 218V53.6Z" fill="#FF4B00"/>
                        <path d="M208.5 31.3L111.4 53.6V218L208.5 186.7V31.3Z" fill="#C43100"/>
                        <path d="M256 71.4L111.4 53.6V218L256 256.4V71.4Z" fill="#F35325"/>
                    </svg>
                );
            case 'wp':
                return (
                    <svg viewBox="-20 -20 300 300" className="svg-icon svg-logo wp-logo-adjust logo-wordpress" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#21759B" d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm0 245.5c-23.7 0-46-7.1-64.8-19.3l52.3-151.6 37.8 103.4c11.9-5.1 22.1-13.4 29.8-23.9L128 245.5zm-83-18.7c-33.1-19.2-57.1-51.4-65.7-89.2l62.2-17.1L61 226.8zm219.7-89.2c-8.6 37.8-32.6 70-65.7 89.2l19.5-106.3 46.2 17.1z"/>
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
        <div className={`tool-card-outer layer-${tool.layer} logo-container-${tool.id}`}>
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
