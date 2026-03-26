import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './SkillsAndTools.css';

const toolsData = [
    { name: 'Figma', level: 95, icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.24 2 7 4.24 7 7c0 2.11 1.3 3.91 3.14 4.67C8.3 12.42 7 14.22 7 16.33 7 19.1 9.24 21.33 12 21.33c1.38 0 2.63-.56 3.53-1.47V22c0 2.76 2.24 5 5 5s5-2.24 5-5V12c0-2.76-2.24-5-5-5h-1.47C18.16 4.24 15.92 2 13.16 2H12zM12 4h1.16c1.66 0 3 1.34 3 3s-1.34 3-3 3H12V4zm5.53 5.33H19c1.66 0 3 1.34 3 3s-1.34 3-3 3h-1.47V9.33zM12 11.33h1.16c1.66 0 3 1.34 3 3s-1.34 3-3 3H12v-6zm5.53 7.33H19c1.66 0 3 1.34 3 3s-1.34 3-3 3h-1.47v-6zM12 18.67c1.66 0 3 1.34 3 3v2.67c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3z"/></svg>, levelText: "Expert" },
    { name: 'Meta', level: 85, icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.7 12c-2.2 0-3.9 1-5.1 2.6C10.4 13 8.7 12 6.5 12c-3.2 0-5.8 2.2-5.8 5s2.6 5 5.8 5c1.8 0 3.5-.8 4.6-2.1.3-.4.7-.4 1 0 1.1 1.3 2.8 2.1 4.6 2.1 3.2 0 5.8-2.2 5.8-5s-2.6-5-5.8-5zM6.5 20.4c-2.3 0-4.1-1.5-4.1-3.4s1.8-3.4 4.1-3.4c1.1 0 2.2.4 3 1.2.9.9 1.4 2.1 1.4 3.4 0 1.9-1.8 3.4-4.4 3.4zm10.2 0c-2.6 0-4.4-1.5-4.4-3.4 0-1.3.5-2.5 1.4-3.4.8-.8 1.9-1.2 3-1.2 2.3 0 4.1 1.5 4.1 3.4s-1.8 3.4-4.1 3.4z"/></svg>, levelText: "Advanced" },
    { name: 'Photoshop', level: 90, icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.5 4.5v15c0 2.2 1.8 4 4 4h15c2.2 0 4-1.8 4-4v-15c0-2.2-1.8-4-4-4h-15c-2.2 0-4 1.8-4 4zm8.2 11.5c0 1.2-.4 2.1-1.1 2.7-.7.6-1.7.9-2.9.9H3.1V8.6h2.2c1.2 0 2.2.3 2.9.8.7.5 1.1 1.3 1.1 2.4 0 .9-.3 1.6-.9 2.1-.6.5-1.5.7-2.7.7h-.9v2.2h.9c.7 0 1.3-.2 1.6-.5.3-.3.5-.8.5-1.5 0-.7-.2-1.2-.5-1.5-.3-.3-.9-.5-1.6-.5h-.9v-2.2h.9c1.2 0 2 .2 2.7.7.7.5 1.1 1.3 1.1 2.3zm8.2 1.1c0 1.2-.4 2.1-1.1 2.7-.7.6-1.7.9-2.9.9h-1.6V8.6h1.6c1.2 0 2.2.3 2.9.8.7.5 1.1 1.3 1.1 2.4 0 1.1-.4 1.9-1.1 2.4-.7.5-1.7.8-2.9.8h-1.6v2.2h1.6c1.2 0 1.9-.2 2.4-.6s.7-1.1.7-1.9z"/></svg>, levelText: "Professional" },
    { name: 'Illustrator', level: 90, icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.5 4.5v15c0 2.2 1.8 4 4 4h15c2.2 0 4-1.8 4-4v-15c0-2.2-1.8-4-4-4h-15c-2.2 0-4 1.8-4 4zm4.2 14.1l-1.1-3.5H1.4l-1.1 3.5H-.9l3-9.4h1.1l3 9.4h-1.5zm-1.8-5.6h-.9L1 11.1h1.5zM8.5 8.6h1.5v9.4H8.5V8.6z"/></svg>, levelText: "Professional" },
    { name: 'WordPress', level: 88, icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.1 2C6.5 2 2 6.5 2 12.1s4.5 10.1 10.1 10.1 10.1-4.5 10.1-10.1S17.6 2 12.1 2zM3.9 12.1c0-1.7.5-3.2 1.3-4.5l5.2 14.3C6.9 20.8 3.9 16.8 3.9 12.1zM12.1 20.1c-.2 0-.3 0-.5-.1l-2.6-7.5h.3l2.8 7.6zm3.3.1L10.3 7c1-.2 2.2-.2 3.1 0l5.1 13.2c-1-.2-2.1-.2-3.1 0zM17.4 12c.1.9.1 1.8-.1 2.7l-2.7-7.4c1.1.8 2.1 1.9 2.8 3.1 0 .5 0 1.1 0 1.6z" /></svg>, levelText: "Intermediate" },
    { name: 'HTML', level: 80, icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.5 6H7.1l.2 2.2h9l-.4 4.5-3.9 1.3-4-1.3-.3-2.3H3.6l.5 5.5 7.9 2.6 7.9-2.6.5-5.5.1-4.4z" /></svg>, levelText: "Proficient" },
    { name: 'Premiere', level: 75, icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.5 4.5v15c0 2.2 1.8 4 4 4h15c2.2 0 4-1.8 4-4v-15c0-2.2-1.8-4-4-4h-15c-2.2 0-4 1.8-4 4zm8.2 11.5c0 1.2-.4 2.1-1.1 2.7-.7.6-1.7.9-2.9.9H3.1V8.6h2.2c1.2 0 2.2.3 2.9.8.7.5 1.1 1.3 1.1 2.4 0 .9-.3 1.6-.9 2.1-.6.5-1.5.7-2.7.7h-.9v2.2h.9c.7 0 1.3-.2 1.6-.5.3-.3.5-.8.5-1.5 0-.7-.2-1.2-.5-1.5-.3-.3-.9-.5-1.6-.5h-.9v-2.2h.9c1.2 0 2 .2 2.7.7.7.5 1.1 1.3 1.1 2.3zM15.4 14l-.9-2.8h-.1L13.5 14h1.9zm1.7 4.1l-1.1-3.5H13.6l-1.1 3.5H11.3l3-9.4H15.4l3 9.4h-1.3z"/></svg>, levelText: "Proficient" }
];

const skillsData = [
    { icon: '🎨', name: 'Designing' },
    { icon: '✏️', name: 'Sketching' },
    { icon: '🧠', name: 'Learning' },
    { icon: '🤝', name: 'Teamwork' },
    { icon: '🧩', name: 'Problem Solving' },
    { icon: '💡', name: 'Creativity' },
    { icon: '🖌', name: 'Logo Designing' },
    { icon: '📈', name: 'Digital Marketing' }
];

const PremiumCard = ({ children, className }) => {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springConfig = { damping: 25, stiffness: 400 };
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), springConfig);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
        
        e.currentTarget.style.setProperty('--mouse-x', `${(e.clientX - rect.left)}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${(e.clientY - rect.top)}px`);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div 
            className={`st-premium-card ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
        >
            {/* LAYERED DEPTH SYSTEM */}
            <div className="st-card-border-glow"></div>
            <div className="st-card-inner-glow"></div>
            <div className="st-card-shine-sweep"></div>
            
            <div className="st-card-inner-layer">
                {children}
            </div>
        </motion.div>
    );
};



const SectionHeading = ({ title }) => (
    <div className="st-heading-wrapper">
        <h4 className="st-sub-heading">{title}</h4>
        <motion.div 
            className="st-heading-accent"
            initial={{ width: 0 }}
            whileInView={{ width: 50 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "circOut" }}
        />
    </div>
);

const SkillsAndTools = () => {
    const skills = skillsData;
    const tools = toolsData;

    return (
        <section id="skills-and-tools" className="st-premium-section">
            <div className="st-premium-glow"></div>
            

            
            <div className="st-main-view">
                <div className="st-responsive-layout">
                    {/* SKILLS ZONE */}
                    <motion.div 
                        className="st-responsive-col skills-col"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="st-blob-wrapper">
                            <div className="st-contained-blob st-contained-blob-skills"></div>
                        </div>
                        <div className="st-col-wrapper">
                            <SectionHeading title="Skills" />
                            <div className="st-responsive-grid skills-grid">
                                {skills.map((skill, idx) => (
                                    <motion.div
                                        key={`skill-${idx}`}
                                        initial={{ opacity: 0, x: -50, y: 10 }}
                                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: idx * 0.08, 
                                            ease: [0.16, 1, 0.3, 1] 
                                        }}
                                    >
                                        <PremiumCard className="skill-item-card">
                                            <span className="skill-icon-emoji">{skill.icon}</span>
                                            <span className="skill-name-text">{skill.name}</span>
                                        </PremiumCard>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* TOOLS ZONE */}
                    <motion.div 
                        className="st-responsive-col tools-col"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="st-blob-wrapper">
                            <div className="st-contained-blob st-contained-blob-tools"></div>
                        </div>
                        <div className="st-col-wrapper">
                            <SectionHeading title="Tools" />
                            <div className="st-responsive-grid tools-grid">
                                {tools.map((tool, idx) => (
                                    <motion.div
                                        key={`tool-${idx}`}
                                        initial={{ opacity: 0, x: 50, y: 10 }}
                                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: 0.1 + idx * 0.08, 
                                            ease: [0.16, 1, 0.3, 1] 
                                        }}
                                    >
                                        <PremiumCard className="tool-item-card">
                                            <div className="tool-icon-wrapper">{tool.icon}</div>
                                            <div className="tool-meta">
                                                <span className="tool-label">{tool.name}</span>
                                            </div>
                                            
                                            <div className="tool-mini-tooltip">{tool.levelText} ({tool.level}%)</div>
                                            
                                            <div className="tool-progress-track">
                                                <motion.div 
                                                    className="tool-progress-fill"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${tool.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: 0.5 }}
                                                />
                                            </div>
                                        </PremiumCard>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};







export default SkillsAndTools;


