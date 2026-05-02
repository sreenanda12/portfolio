import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './SkillsAndTools.css';

const toolsList = [
    { name: 'Figma', level: 95, icon: '/icons/figma update .png', color: '#F24E1E', status: 'Expert' },
    { name: 'Photoshop', level: 95, icon: '/icons/ps%20roboto.png', color: '#31A8FF', status: 'Expert' },
    { name: 'Illustrator', level: 90, icon: '/icons/illustrator.png', color: '#FF9A00', status: 'Advanced' },
    { name: 'Meta', level: 80, icon: 'meta', color: '#0668E1', status: 'Advanced', isSVG: true },
    { name: 'Premiere Pro', level: 85, icon: '/icons/premiere.png', color: '#9999FF', status: 'Advanced' },
    { name: 'Blender', level: 85, icon: '/icons/blender.png', color: '#EA7600', status: 'Advanced' },
    { name: 'Claude', level: 80, icon: '/icons/claude.png', color: '#6A4D9C', status: 'Advanced' },
    { name: 'HTML5', level: 75, icon: '/icons/html.png', color: '#E34F26', status: 'Advanced' },
    { 
        name: 'WordPress', 
        level: 85, 
        icon: { 
            light: '/icons/word press light.png', 
            dark: '/icons/word press dark.png' 
        }, 
        color: '#21759B', 
        status: 'Advanced' 
    },
    { 
        name: 'Microsoft Office', 
        level: 88, 
        icon: { 
            light: '/icons/ms office light.png', 
            dark: '/icons/ms office dark.png' 
        }, 
        color: '#EB3C00', 
        status: 'Expert' 
    },
    { 
        name: 'Unreal Engine', 
        level: 85, 
        icon: { 
            light: '/icons/unity.png', 
            dark: '/icons/unity logo white.png' 
        }, 
        color: '#2C2924', 
        status: 'Advanced' 
    },
    { 
        name: 'Unity', 
        level: 90, 
        icon: { 
            light: '/icons/unitylogo.png', 
            dark: '/icons/unity logo light.png' 
        }, 
        color: '#2C2924', 
        status: 'Expert' 
    }
];

const skillsChips = [
    "Designing", "✏️ Sketching", "🧠 Learning", "🤝 Teamwork", "🧩 Problem Solving", "💡 Creativity", "🖌 Logo Designing", "📈 Digital Marketing",
    "🧩 Wireframing", "⚡ Prototyping", "📱 Responsive Design", "🔍 User Research"
];

const languagesList = [
    { name: 'English', level: 95 },
    { name: 'Malayalam', level: 100 },
    { name: 'Hindi', level: 80 },
    { name: 'Arabic', level: 50 }
];

const SectionTitle = ({ children }) => (
    <div className="st-title-wrapper">
        <h3 className="st-title-text">{children}</h3>
        <div className="st-title-underline"></div>
    </div>
);

const LanguageCard = ({ name, level, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [count, setCount] = useState(0);
    const [isInView, setIsInView] = useState(false);

    // Counting effect
    useEffect(() => {
        if (isInView) {
            const controls = animate(0, level, {
                duration: 1.5,
                delay: 0.1 + (index * 0.15),
                ease: "easeOut",
                onUpdate: (value) => setCount(Math.round(value))
            });
            return () => controls.stop();
        }
    }, [isInView, level, index]);

    return (
        <motion.div 
            className="st-lang-card-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            onViewportEnter={() => setIsInView(true)}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`st-lang-card ${isHovered ? 'hovered' : ''}`}>
                <div className="st-lang-header">
                    <span className="st-lang-name">{name}</span>
                    <span className="st-lang-percent">{count}%</span>
                </div>
                
                <div className="st-lang-progress-container">
                    <motion.div 
                        className={`st-lang-progress-fill ${isHovered ? 'hover-highlight' : ''}`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${level}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.1 + (index * 0.15), ease: "easeOut" }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

const ToolCard = ({ name, level, icon, color, status, index, isSVG, theme }) => {
    const [isInteracting, setIsInteracting] = useState(false);

    const iconSrc = typeof icon === 'object' 
        ? (theme === 'dark' ? icon.dark : icon.light)
        : icon;

    const renderIcon = () => {
        if (isSVG) {
            return (
                <svg viewBox="0 0 24 24" fill="currentColor" className="st-tool-png-icon">
                    <path d="M16.7 12c-2.2 0-3.9 1-5.1 2.6C10.4 13 8.7 12 6.5 12c-3.2 0-5.8 2.2-5.8 5s2.6 5 5.8 5c1.8 0 3.5-.8 4.6-2.1.3-.4.7-.4 1 0 1.1 1.3 2.8 2.1 4.6 2.1 3.2 0 5.8-2.2 5.8-5s-2.6-5-5.8-5zM6.5 20.4c-2.3 0-4.1-1.5-4.1-3.4s1.8-3.4 4.1-3.4c1.1 0 2.2.4 3 1.2.9.9 1.4 2.1 1.4 3.4 0 1.9-1.8 3.4-4.4 3.4zm10.2 0c-2.6 0-4.4-1.5-4.4-3.4 0-1.3.5-2.5 1.4-3.4.8-.8 1.9-1.2 3-1.2 2.3 0 4.1 1.5 4.1 3.4s-1.8 3.4-4.1 3.4z"/>
                </svg>
            );
        }
        return <img src={iconSrc} alt={name} className="st-tool-png-icon" draggable="false" />;
    };

    return (
        <motion.div 
            className={`st-tool-card interactive logo-${name.toLowerCase().replace(/\s+/g, '-')}`}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onClick={() => setIsInteracting(!isInteracting)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <div className="st-tool-header">
                <div className="st-card-icon premium-icon-hover">
                    {renderIcon()}
                </div>
                <span className="st-tool-name">{name}</span>
                
                <AnimatePresence>
                    {isInteracting && (
                        <motion.div 
                            className="st-floating-label"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {status} ({level}%)
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="st-progress-container">
                <motion.div 
                    className="st-progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="st-shimmer"></div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const Chip = ({ label, index }) => {
    return (
        <motion.div 
            className="st-chip-premium interactive"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.97 }} 
            transition={{ 
                duration: 0.4, 
                delay: index * 0.1, 
                ease: "easeOut"
            }}
        >
            <span className="st-chip-text">{label}</span>
        </motion.div>
    );
};

const SkillsAndTools = () => {
    const { theme } = useTheme();
    return (
        <section className="st-main-section" id="skills-tools">
            <div className="container st-layout">
                
                {/* LEFT SIDE: TOOLS (Arranged in 2 columns with 10 icons) */}
                <div className="st-left-col">
                    <SectionTitle>Tools</SectionTitle>
                    <div className="st-tools-grid">
                        {toolsList.map((tool, idx) => (
                            <ToolCard 
                                key={tool.name} 
                                name={tool.name} 
                                level={tool.level} 
                                icon={tool.icon} 
                                color={tool.color} 
                                status={tool.status}
                                index={idx}
                                isSVG={tool.isSVG}
                                theme={theme}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE: SKILLS & LANGUAGES */}
                <div className="st-right-col">
                    
                    {/* TOP: MY SKILLS */}
                    <div className="st-skills-block">
                        <SectionTitle>My Skills</SectionTitle>
                        <div className="st-chips-container">
                            {skillsChips.map((skill, idx) => (
                                <Chip key={skill} label={skill} index={idx} />
                            ))}
                        </div>
                    </div>

                    {/* BOTTOM: LANGUAGES */}
                    <div className="st-languages-block">
                        <SectionTitle>Languages</SectionTitle>
                        <div className="st-languages-grid">
                            {languagesList.map((lang, idx) => (
                                <LanguageCard 
                                    key={lang.name} 
                                    name={lang.name} 
                                    level={lang.level} 
                                    icon={lang.icon} 
                                    index={idx}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SkillsAndTools;
