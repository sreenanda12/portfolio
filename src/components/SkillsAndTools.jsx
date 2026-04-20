import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SkillsAndTools.css';

const toolsList = [
    { 
        name: 'Figma', 
        level: 95, 
        icon: (
            <svg width="32" height="32" viewBox="0 0 38 57" className="st-tool-svg-icon svg-logo logo-figma">
                <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
                <path d="M0 47.5a9.5 9.5 0 0 1 9.5-9.5H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
                <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
                <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
                <path d="M0 28.5a9.5 9.5 0 0 0 9.5 9.5H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
            </svg>
        ), 
        color: '#F24E1E', 
        status: 'Expert',
        isSVG: true
    },
    { name: 'Photoshop', level: 85, icon: '/icons/ps%20roboto.png', color: '#31A8FF', status: 'Advanced' },
    { name: 'Illustrator', level: 88, icon: '/icons/illustrator.png', color: '#FF9A00', status: 'Advanced' },
    { name: 'Meta', level: 75, icon: '/icons/xd.png', color: '#0668E1', status: 'Intermediate' },
    { 
        name: 'WordPress', 
        level: 80, 
        icon: (
            <svg viewBox="0 0 24 24" className="st-tool-svg-icon svg-logo logo-wordpress" xmlns="http://www.w3.org/2000/svg">
                <path fill="#21759B" d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.051-.181 2.986-.51-.102-.23-.51-.865-.333-1.226l2.131-5.845c.125-.332.32-.475.32-.475l-4.946-.149zm-5.903-8.12c-.524 1.171-.78 2.502-.78 3.91 0 1.933.498 3.69 1.34 5.215l5.057-13.385C8.895 1.258 5.86 3.036 6.255 4.666zm8.134 4.542l.22.46c.144.3.266.606.368.91l2.036 5.568c.245-.733.376-1.52.376-2.33 0-1.428-.403-2.766-1.1-3.905l-1.9 1.297zM12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 .5c5.03 0 9.324 3.535 10.457 8.3L17.21 4.5c-.88-.633-1.896-.92-2.812-.92-1.532 0-3.045.748-3.045 2.128 0 1.008.576 1.836 1.368 3.168l.8 1.334c.468.792.864 1.512.864 2.232 0 .936-.648 1.872-1.656 1.872-.936 0-1.728-.612-1.728-1.548 0-.684.396-1.584.828-2.628l.252-.612-5.46-15.084C7.818 1.48 9.845.5 12 .5z"/>
            </svg>
        ), 
        color: '#21759B', 
        status: 'Advanced',
        isSVG: true
    },
    { name: 'HTML5', level: 85, icon: '/icons/html.png', color: '#E34F26', status: 'Advanced' },
    { name: 'Premiere Pro', level: 70, icon: '/icons/premiere.png', color: '#9999FF', status: 'Intermediate' },
    { name: 'Unity', level: 65, icon: '/icons/unity.png', color: '#2C2924', status: 'Intermediate' },
    { 
        name: 'Microsoft Office', 
        level: 90, 
        icon: (
            <svg viewBox="0 0 24 24" className="st-tool-svg-icon svg-logo microsoft-logo-adjust logo-microsoft-office" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4 5.1L7.2 7.3c-.8.3-1.4 1-1.4 1.9v9.9l3.3 1.8V10.4l5.3-1.6V5.1z" fill="#9d1f3d"/>
                <path d="M20.2 3.2L14.4 0v19.8l5.8 3.4c.8.5 1.9-.1 1.9-1.1V4.3c0-1-1-1.6-1.9-1.1z" fill="#f58025"/>
                <path d="M14.4 19.8V24l-6.8-4.2c-.7-.4-1.2-1.2-1.2-2V17l7.5.8z" fill="#e32a25"/>
            </svg>
        ), 
        color: '#EB3C00', 
        status: 'Expert',
        isSVG: true
    },
    { name: 'Unity Logo', level: 75, icon: '/icons/unitylogo.png', color: '#2C2924', status: 'Intermediate' }
];

const skillsChips = [
    "Designing", "✏️ Sketching", "🧠 Learning", "🤝 Teamwork", "🧩 Problem Solving", "💡 Creativity", "🖌 Logo Designing", "📈 Digital Marketing"
];

const languagesList = [
    { name: 'English', level: 98 },
    { name: 'Malayalam', level: 95 },
    { name: 'Hindi', level: 90 },
    { name: 'Arabic', level: 94 }
];

const SectionTitle = ({ children }) => (
    <div className="st-title-wrapper">
        <h3 className="st-title-text">{children}</h3>
        <div className="st-title-underline"></div>
    </div>
);

const LanguageCard = ({ name, level, index }) => {
    return (
        <motion.div 
            className="st-lang-card interactive"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ willChange: 'transform' }}
        >
            <div className="st-lang-header">
                <div className="st-lang-info">
                    <span className="st-lang-name">{name}</span>
                    <span className="st-lang-percent">{level}%</span>
                </div>
            </div>
            <div className="st-lang-progress-container">
                <motion.div 
                    className="st-lang-progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                >
                    <div className="st-bar-glow"></div>
                    <div className="st-bar-shimmer"></div>
                </motion.div>
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
