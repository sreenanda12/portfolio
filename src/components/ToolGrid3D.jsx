import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ToolGrid3D.css';

const tools = [
    { name: 'Photoshop', icon: '/icons/ps%20roboto.png' },
    { name: 'Figma', isSVG: true },
    { name: 'Illustrator', icon: '/icons/illustrator.png' },
    { name: 'Adobe XD', icon: '/icons/xd.png' },
    { name: 'Premiere Pro', icon: '/icons/premiere.png' },
    { name: 'HTML5', icon: '/icons/html.png' },
    { name: 'Unity', icon: '/icons/unity.png' },
    { name: 'WordPress', isSVG: true },
    { name: 'Microsoft Office', isSVG: true },
    { name: 'Unity Logo', icon: '/icons/unitylogo.png' }
];

const ToolIcon = ({ name }) => {
    switch (name) {
        case 'Figma':
            return (
                <svg width="40" height="40" viewBox="0 0 38 57" className="tool-3d-icon svg-logo">
                    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
                    <path d="M0 47.5a9.5 9.5 0 0 1 9.5-9.5H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
                    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
                    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
                    <path d="M0 28.5a9.5 9.5 0 0 0 9.5 9.5H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
                </svg>
            );
        case 'WordPress':
            return (
                <svg viewBox="0 0 24 24" className="tool-3d-icon svg-logo logo-wordpress" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#21759B" d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.051-.181 2.986-.51-.102-.23-.51-.865-.333-1.226l2.131-5.845c.125-.332.32-.475.32-.475l-4.946-.149zm-5.903-8.12c-.524 1.171-.78 2.502-.78 3.91 0 1.933.498 3.69 1.34 5.215l5.057-13.385C8.895 1.258 5.86 3.036 6.255 4.666zm8.134 4.542l.22.46c.144.3.266.606.368.91l2.036 5.568c.245-.733.376-1.52.376-2.33 0-1.428-.403-2.766-1.1-3.905l-1.9 1.297zM12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 .5c5.03 0 9.324 3.535 10.457 8.3L17.21 4.5c-.88-.633-1.896-.92-2.812-.92-1.532 0-3.045.748-3.045 2.128 0 1.008.576 1.836 1.368 3.168l.8 1.334c.468.792.864 1.512.864 2.232 0 .936-.648 1.872-1.656 1.872-.936 0-1.728-.612-1.728-1.548 0-.684.396-1.584.828-2.628l.252-.612-5.46-15.084C7.818 1.48 9.845.5 12 .5z"/>
                </svg>
            );
        case 'Microsoft Office':
            return (
                <svg viewBox="0 0 24 24" className="tool-3d-icon svg-logo microsoft-logo-adjust logo-microsoft-office" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.4 5.1L7.2 7.3c-.8.3-1.4 1-1.4 1.9v9.9l3.3 1.8V10.4l5.3-1.6V5.1z" fill="#9d1f3d"/>
                    <path d="M20.2 3.2L14.4 0v19.8l5.8 3.4c.8.5 1.9-.1 1.9-1.1V4.3c0-1-1-1.6-1.9-1.1z" fill="#f58025"/>
                    <path d="M14.4 19.8V24l-6.8-4.2c-.7-.4-1.2-1.2-1.2-2V17l7.5.8z" fill="#e32a25"/>
                </svg>
            );
        default:
            return null;
    }
};

const ToolCard = ({ tool, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.9 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.05 
            }
        }
    };

    return (
        <motion.div 
            className="tool-3d-card-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
        >
            <div className="tool-3d-card" style={{ '--float-delay': `${index * -0.5}s` }}>
                {tool.isSVG ? (
                    <ToolIcon name={tool.name} />
                ) : (
                    <img src={tool.icon} alt={tool.name} className="tool-3d-icon" draggable="false" />
                )}
                <div className="tool-3d-glow"></div>
            </div>
            
            <AnimatePresence>
                {isHovered && (
                    <motion.span 
                        className="tool-3d-name"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {tool.name}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ToolGrid3D = ({ isHero = false }) => {
    const containerRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const requestRef = useRef();

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mousePos.current = {
                x: (clientX / innerWidth) * 2 - 1,
                y: (clientY / innerHeight) * 2 - 1
            };
        };

        const updateParallax = () => {
            if (containerRef.current && window.innerWidth > 1024) {
                const cards = containerRef.current.querySelectorAll('.tool-3d-card');
                cards.forEach((card) => {
                    const angleX = mousePos.current.y * -8;
                    const angleY = mousePos.current.x * 8;
                    card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
                });
            }
            requestRef.current = requestAnimationFrame(updateParallax);
        };

        if (isHero && window.innerWidth > 1024) {
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
            requestRef.current = requestAnimationFrame(updateParallax);
        }

        return () => {
            if (isHero) {
                window.removeEventListener('mousemove', handleMouseMove);
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isHero]);

    // Grouping into 5 columns strictly for 10 icons
    const rows = [];
    for (let i = 0; i < tools.length; i += 5) {
        rows.push(tools.slice(i, i + 5));
    }

    return (
        <div className={`hero-3d-grid-container ${!isHero ? 'about-grid' : ''}`} ref={containerRef}>
            {isHero && <div className="hero-glow-enhanced"></div>}
            <div className="hero-3d-grid-content">
                {rows.map((row, rowIndex) => (
                    <div className="hero-3d-grid-row" key={rowIndex}>
                        {row.map((tool, i) => (
                            <ToolCard 
                                key={tool.name} 
                                tool={tool} 
                                index={rowIndex * 5 + i} 
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ToolGrid3D;
