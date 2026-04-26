import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from 'framer-motion';
import './SkillsAndTools.css';

const toolsList = [
    { 
        name: 'Figma', 
        level: 95, 
        icon: '/icons/figma.png',
        color: '#F24E1E', 
        status: 'Expert',
        isSVG: false
    },
    { name: 'Photoshop', level: 85, icon: '/icons/ps%20roboto.png', color: '#31A8FF', status: 'Advanced' },
    { name: 'Illustrator', level: 88, icon: '/icons/illustrator.png', color: '#FF9A00', status: 'Advanced' },
    { name: 'Meta', level: 75, icon: '/icons/xd.png', color: '#0668E1', status: 'Intermediate' },
    { name: 'WordPress', level: 80, icon: '/icons/wordpress.png', color: '#21759B', status: 'Advanced' },
    { name: 'HTML5', level: 85, icon: '/icons/html.png', color: '#E34F26', status: 'Advanced' },
    { name: 'Premiere Pro', level: 70, icon: '/icons/premiere.png', color: '#9999FF', status: 'Intermediate' },
    { name: 'Unity', level: 65, icon: '/icons/unity.png', color: '#2C2924', status: 'Intermediate' },
    { name: 'Microsoft Office', level: 90, icon: '/icons/microsoft.png', color: '#EB3C00', status: 'Expert' },
    { name: 'Unity Logo', level: 75, icon: '/icons/unitylogo.png', color: '#2C2924', status: 'Intermediate' }
];

const skillsChips = [
    "Designing", "✏️ Sketching", "🧠 Learning", "🤝 Teamwork", "🧩 Problem Solving", "💡 Creativity", "🖌 Logo Designing", "📈 Digital Marketing"
];

const languagesList = [
    { name: 'English', level: 90 },
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

const ToolCard = ({ name, level, icon, color, status, index }) => {
    const [isInteracting, setIsInteracting] = useState(false);

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
                    {typeof icon === 'string' ? (
                        <img src={icon} alt={name} className="st-tool-png-icon" draggable="false" />
                    ) : (
                        icon
                    )}
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
