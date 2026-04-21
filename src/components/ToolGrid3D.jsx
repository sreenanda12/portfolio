import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ToolGrid3D.css';

const tools = [
    { name: 'Photoshop', icon: '/icons/ps%20roboto.png' },
    { name: 'Figma', icon: '/icons/figma.png' },
    { name: 'Illustrator', icon: '/icons/illustrator.png' },
    { name: 'Adobe XD', icon: '/icons/xd.png' },
    { name: 'Premiere Pro', icon: '/icons/premiere.png' },
    { name: 'HTML5', icon: '/icons/html.png' },
    { name: 'Unity', icon: '/icons/unity.png' },
    { name: 'WordPress', icon: '/icons/wordpress.png' },
    { name: 'Microsoft Office', icon: '/icons/microsoft.png' },
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
