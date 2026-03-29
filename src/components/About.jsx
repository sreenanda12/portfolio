import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {Award, GraduationCap, Code, Globe, PenTool, Layout, Palette, Users, Lightbulb, Figma, Monitor, ZoomIn, ZoomOut, Maximize2, ExternalLink } from 'lucide-react';
import './About.css';
import CertificationModal from './CertificationModal';

const toolsData = [
    { 
        name: 'Figma', 
        level: 95, 
        icon: <svg viewBox="0 0 24 24" fill="white"><path d="M12 2C9.24 2 7 4.24 7 7c0 2.11 1.3 3.91 3.14 4.67C8.3 12.42 7 14.22 7 16.33 7 19.1 9.24 21.33 12 21.33c1.38 0 2.63-.56 3.53-1.47V22c0 2.76 2.24 5 5 5s5-2.24 5-5V12c0-2.76-2.24-5-5-5h-1.47C18.16 4.24 15.92 2 13.16 2H12zM12 4h1.16c1.66 0 3 1.34 3 3s-1.34 3-3 3H12V4zm5.53 5.33H19c1.66 0 3 1.34 3 3s-1.34 3-3 3h-1.47V9.33zM12 11.33h1.16c1.66 0 3 1.34 3 3s-1.34 3-3 3H12v-6zm5.53 7.33H19c1.66 0 3 1.34 3 3s-1.34 3-3 3h-1.47v-6zM12 18.67c1.66 0 3 1.34 3 3v2.67c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3z"/></svg> 
    },
    { 
        name: 'Meta Business Suite', 
        level: 85, 
        icon: <svg viewBox="0 0 24 24" fill="white"><path d="M16.7 12c-2.2 0-3.9 1-5.1 2.6C10.4 13 8.7 12 6.5 12c-3.2 0-5.8 2.2-5.8 5s2.6 5 5.8 5c1.8 0 3.5-.8 4.6-2.1.3-.4.7-.4 1 0 1.1 1.3 2.8 2.1 4.6 2.1 3.2 0 5.8-2.2 5.8-5s-2.6-5-5.8-5zM6.5 20.4c-2.3 0-4.1-1.5-4.1-3.4s1.8-3.4 4.1-3.4c1.1 0 2.2.4 3 1.2.9.9 1.4 2.1 1.4 3.4 0 1.9-1.8 3.4-4.4 3.4zm10.2 0c-2.6 0-4.4-1.5-4.4-3.4 0-1.3.5-2.5 1.4-3.4.8-.8 1.9-1.2 3-1.2 2.3 0 4.1 1.5 4.1 3.4s-1.8 3.4-4.1 3.4z"/></svg> 
    },
    { 
        name: 'Photoshop', 
        level: 90, 
        icon: <svg viewBox="0 0 24 24" fill="white"><path d="M.5 4.5v15c0 2.2 1.8 4 4 4h15c2.2 0 4-1.8 4-4v-15c0-2.2-1.8-4-4-4h-15c-2.2 0-4 1.8-4 4zm8.2 11.5c0 1.2-.4 2.1-1.1 2.7-.7.6-1.7.9-2.9.9H3.1V8.6h2.2c1.2 0 2.2.3 2.9.8.7.5 1.1 1.3 1.1 2.4 0 .9-.3 1.6-.9 2.1-.6.5-1.5.7-2.7.7h-.9v2.2h.9c.7 0 1.3-.2 1.6-.5.3-.3.5-.8.5-1.5 0-.7-.2-1.2-.5-1.5-.3-.3-.9-.5-1.6-.5h-.9v-2.2h.9c1.2 0 2 .2 2.7.7.7.5 1.1 1.3 1.1 2.3zm8.2 1.1c0 1.2-.4 2.1-1.1 2.7-.7.6-1.7.9-2.9.9h-1.6V8.6h1.6c1.2 0 2.2.3 2.9.8.7.5 1.1 1.3 1.1 2.4 0 1.1-.4 1.9-1.1 2.4-.7.5-1.7.8-2.9.8h-1.6v2.2h1.6c1.2 0 1.9-.2 2.4-.6s.7-1.1.7-1.9z"/></svg> 
    },
    { 
        name: 'Illustrator', 
        level: 90, 
        icon: <svg viewBox="0 0 24 24" fill="white"><path d="M.5 4.5v15c0 2.2 1.8 4 4 4h15c2.2 0 4-1.8 4-4v-15c0-2.2-1.8-4-4-4h-15c-2.2 0-4 1.8-4 4zm4.2 14.1l-1.1-3.5H1.4l-1.1 3.5H-.9l3-9.4h1.1l3 9.4h-1.5zm-1.8-5.6h-.9L1 11.1h1.5zM8.5 8.6h1.5v9.4H8.5V8.6z"/></svg> 
    },
    { 
        name: 'WordPress', 
        level: 88, 
        icon: <svg viewBox="0 0 24 24" fill="white"><path d="M12.1 2C6.5 2 2 6.5 2 12.1s4.5 10.1 10.1 10.1 10.1-4.5 10.1-10.1S17.6 2 12.1 2zM3.9 12.1c0-1.7.5-3.2 1.3-4.5l5.2 14.3C6.9 20.8 3.9 16.8 3.9 12.1zM12.1 20.1c-.2 0-.3 0-.5-.1l-2.6-7.5h.3l2.8 7.6zm3.3.1L10.3 7c1-.2 2.2-.2 3.1 0l5.1 13.2c-1-.2-2.1-.2-3.1 0zM17.4 12c.1.9.1 1.8-.1 2.7l-2.7-7.4c1.1.8 2.1 1.9 2.8 3.1 0 .5 0 1.1 0 1.6z" /></svg> 
    },
    { 
        name: 'HTML', 
        level: 80, 
        icon: <svg viewBox="0 0 24 24" fill="white"><path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.5 6H7.1l.2 2.2h9l-.4 4.5-3.9 1.3-4-1.3-.3-2.3H3.6l.5 5.5 7.9 2.6 7.9-2.6.5-5.5.1-4.4z" /></svg> 
    },
    { 
        name: 'Premiere Pro', 
        level: 75, 
        icon: <svg viewBox="0 0 24 24" fill="white"><path d="M.5 4.5v15c0 2.2 1.8 4 4 4h15c2.2 0 4-1.8 4-4v-15c0-2.2-1.8-4-4-4h-15c-2.2 0-4 1.8-4 4zm8.2 11.5c0 1.2-.4 2.1-1.1 2.7-.7.6-1.7.9-2.9.9H3.1V8.6h2.2c1.2 0 2.2.3 2.9.8.7.5 1.1 1.3 1.1 2.4 0 .9-.3 1.6-.9 2.1-.6.5-1.5.7-2.7.7h-.9v2.2h.9c.7 0 1.3-.2 1.6-.5.3-.3.5-.8.5-1.5 0-.7-.2-1.2-.5-1.5-.3-.3-.9-.5-1.6-.5h-.9v-2.2h.9c1.2 0 2 .2 2.7.7.7.5 1.1 1.3 1.1 2.3zM15.4 14l-.9-2.8h-.1L13.5 14h1.9zm1.7 4.1l-1.1-3.5H13.6l-1.1 3.5H11.3l3-9.4H15.4l3 9.4h-1.3z"/></svg> 
    }
];

const skillsData = [
    { name: 'Designing', icon: '🎨' },
    { name: 'Sketching', icon: '✏️' },
    { name: 'Learning', icon: '🧠' },
    { name: 'Teamwork', icon: '🤝' },
    { name: 'Problem Solving', icon: '🧩' },
    { name: 'Creativity', icon: '💡' },
    { name: 'Logo Designing', icon: '🖌' },
    { name: 'Digital Marketing', icon: '📈' }
];

const educationData = [
    {
        degree: "M.Com – Commerce & E-Commerce Specialization",
        year: "2023",
        institution: "Annamalai University",
        icon: <GraduationCap size={24} />
    },
    {
        degree: "B.Com – Co-Operation Specialization",
        year: "2020",
        institution: "Kerala University",
        icon: <Award size={24} />
    },
    {
        degree: "Higher Secondary Education (+2)",
        year: "SCERT Syllabus",
        institution: "CPHSS Kuttikkadu, Kadakkal",
        icon: <GraduationCap size={24} />
    }
];

const certificationsData = [
    {
        id: 1,
        title: "Unity Certified Associate: Game Developer",
        issuer: "Unity / ASAP Kerala",
        date: "2023",
        image: "https://placehold.co/800x600/f3f4f6/2f2f2f?text=Unity+Certificate",
        skills: ["Unity", "C#", "Game UI"]
    },
    {
        id: 2,
        title: "Graphic Design Certification",
        issuer: "ICT Academy of Kerala",
        date: "2022",
        image: "https://placehold.co/800x600/f3f4f6/2f2f2f?text=Graphic+Design+Certificate",
        skills: ["Photoshop", "Illustrator", "Branding"]
    },
    {
        id: 3,
        title: "UI/UX Experience Design",
        issuer: "ASAP Kerala",
        date: "2024",
        image: "https://placehold.co/800x600/f3f4f6/2f2f2f?text=UI/UX+Certificate",
        skills: ["Figma", "User Research", "Prototyping"]
    },
    {
        id: 4,
        title: "Visual Design Professional",
        issuer: "Course Completion",
        date: "2021",
        image: "https://placehold.co/800x600/f3f4f6/2f2f2f?text=Visual+Design+Certificate",
        skills: ["Composition", "Typography", "Color Theory"]
    }
];

const About = () => {
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedCert, setSelectedCert] = useState(null);
    const [isMobileInteracting, setIsMobileInteracting] = useState(false);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

    const nextCert = () => {
        setCurrentCertIndex((prev) => (prev + 1) % certificationsData.length);
    };

    const prevCert = () => {
        setCurrentCertIndex((prev) => (prev - 1 + certificationsData.length) % certificationsData.length);
    };

    // Auto-flow for desktop slider
    useEffect(() => {
        const interval = setInterval(() => {
            if (!selectedCert) nextCert();
        }, 5000);
        return () => clearInterval(interval);
    }, [selectedCert]);

    // Enhanced Auto-flow for mobile swipe
    useEffect(() => {
        if (isMobileInteracting || selectedCert) return;
        
        const interval = setInterval(() => {
            setMobileActiveIndex((prev) => (prev + 1) % certificationsData.length);
        }, 4000);
        
        return () => clearInterval(interval);
    }, [isMobileInteracting, selectedCert]);

    // Track scroll position to update index with throttling
    const handleMobileScroll = (e) => {
        if (!e.target._ticking) {
            const el = e.target;
            window.requestAnimationFrame(() => {
                const { scrollLeft, offsetWidth } = el;
                const index = Math.round(scrollLeft / (offsetWidth * 0.85));
                if (index !== mobileActiveIndex) {
                    setMobileActiveIndex(index);
                }
                el._ticking = false;
            });
            e.target._ticking = true;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="about" className="about-page">
            <div className="container">
                
                <motion.section 
                    className="about-section intro-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h2 
                        className="section-header"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                        }}
                    >
                        Who I Am
                    </motion.h2>

                    <div className="intro-grid">
                        <div className="intro-image-wrapper">
                            <motion.div 
                                className="portrait-container"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.95, y: 30 },
                                    visible: { 
                                        opacity: 1, 
                                        scale: 1, 
                                        y: 0,
                                        transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } 
                                    }
                                }}
                                whileHover={{ 
                                    rotateX: 10, 
                                    rotateY: 10, 
                                    perspective: 1000,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <img src="/who.jpeg" alt="Muhammed Muflih A" className="portrait-img" />
                                
                                {/* Floating Gradient Shapes */}
                                <div className="shape shape-1"></div>
                                <div className="shape shape-2"></div>
                                <div className="shape shape-3"></div>
                                <div className="shape shape-4"></div>
                            </motion.div>
                        </div>

                        <div className="intro-text">
                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { 
                                        opacity: 1, 
                                        y: 0, 
                                        transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } 
                                    }
                                }}
                            >
                                Creative UI & Graphic Designer with 5+ years of experience crafting visually engaging designs across web, mobile, and digital marketing platforms. Skilled in Figma, Adobe Photoshop, Illustrator, Premiere Pro, and Canva, with a strong focus on brand-driven visuals, social media creatives, and user-centered design. Passionate about transforming ideas into impactful digital experiences that elevate brand identity and audience engagement. Currently seeking an opportunity in the UAE to contribute to innovative and growth-focused creative teams.
                            </motion.p>
                        </div>
                    </div>
                </motion.section>

                {/* SECTION 2 — MY TOOLS */}
                <motion.section 
                    className="about-section tools-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { 
                            opacity: 1, 
                            y: 0, 
                            transition: { 
                                duration: 0.6, 
                                ease: "easeOut",
                                staggerChildren: 0.1
                            } 
                        }
                    }}
                >
                    <h2 className="section-header">My Tools</h2>
                    <div className="tools-grid">
                        {toolsData.map((tool, index) => (
                            <motion.div 
                                key={tool.name} 
                                className="tool-item-compact"
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="tool-icon-box">
                                    {tool.icon}
                                </div>
                                <div className="tool-details-compact">
                                    <div className="tool-label-row">
                                        <h3>{tool.name}</h3>
                                        <span className="tool-percent-compact">{tool.level}%</span>
                                    </div>
                                    <div className="progress-bar-compact">
                                        <motion.div 
                                            className="progress-fill-compact"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${tool.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                                        ></motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* SECTION 3 — MY SKILLS */}
                <motion.section 
                    className="about-section skills-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { 
                            opacity: 1, 
                            y: 0, 
                            transition: { 
                                duration: 0.6, 
                                ease: "easeOut",
                                staggerChildren: 0.08
                            } 
                        }
                    }}
                >
                    <h2 className="section-header">My Skills</h2>
                    <div className="skills-pill-container">
                        {skillsData.map((skill, index) => (
                            <motion.button
                                key={skill.name}
                                className={`skill-pill ${activeSkill === skill.name ? 'active' : ''}`}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                                whileHover={{ scale: 1.05, borderColor: '#D88A05' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                            >
                                <span className="skill-icon">{skill.icon}</span>
                                {skill.name}
                                {activeSkill === skill.name && <motion.div className="skill-ripple" layoutId="ripple" />}
                            </motion.button>
                        ))}
                    </div>
                </motion.section>

                {/* SECTION 4 — EDUCATION */}
                <motion.section 
                    className="about-section education-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { 
                            opacity: 1, 
                            y: 0, 
                            transition: { 
                                duration: 0.6, 
                                ease: "easeOut",
                                staggerChildren: 0.15
                            } 
                        }
                    }}
                >
                    <h2 className="section-header">Education</h2>
                    <div className="timeline-container">
                        <motion.div 
                            className="timeline-line"
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        ></motion.div>
                        {educationData.map((edu, index) => (
                            <motion.div 
                                key={edu.degree}
                                className="timeline-item-new"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                            >
                                <div className="timeline-dot-new">
                                    <div className="dot-inner"></div>
                                </div>
                                <motion.div 
                                    className="edu-card"
                                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                                >
                                    <div className="edu-badge">
                                        <span className="icon">{edu.icon}</span>
                                        <span className="year">{edu.year}</span>
                                    </div>
                                    <h3>{edu.degree}</h3>
                                    <p className="institution">{edu.institution}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* SECTION 5 — CERTIFICATIONS */}
                <motion.section 
                    className="about-section certifications-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="cert-bg-decoration"></div>
                    <h2 className="section-header">
                        Certifications
                    </h2>
                    
                    {/* Desktop Slider View */}
                    <div className="cert-slider-wrapper desktop-only">
                        <div className="cert-slider-container">
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={certificationsData[currentCertIndex].id}
                                    className="cert-card active-slide"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 300, 
                                        damping: 30 
                                    }}
                                    onClick={nextCert}
                                >
                                    <div className="cert-image-container">
                                        <img src={certificationsData[currentCertIndex].image} alt={certificationsData[currentCertIndex].title} loading="lazy" />
                                        <div className="cert-overlay">
                                            <div className="cert-view-btn" onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedCert(certificationsData[currentCertIndex]);
                                            }}>
                                                <Maximize2 size={24} />
                                                <span>View Certificate</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cert-info">
                                        <div className="cert-meta">
                                            <span className="cert-issuer">{certificationsData[currentCertIndex].issuer}</span>
                                            <span className="cert-date">{certificationsData[currentCertIndex].date}</span>
                                        </div>
                                        <h3 className="cert-title">{certificationsData[currentCertIndex].title}</h3>
                                        <div className="click-to-next-hint">Click to see next →</div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        
                        <div className="cert-indicators">
                            {certificationsData.map((_, idx) => (
                                <button 
                                    key={idx} 
                                    className={`indicator-dot ${idx === currentCertIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentCertIndex(idx)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Mobile Swipe Carousel with Subtle Previews */}
                    <div className="cert-mobile-scroll-container mobile-only">
                        <div 
                            className="cert-scroll-track"
                            onScroll={handleMobileScroll}
                            onTouchStart={() => setIsMobileInteracting(true)}
                            onTouchEnd={() => setTimeout(() => setIsMobileInteracting(false), 2000)}
                        >
                            {certificationsData.map((cert, index) => {
                                const isActive = index === mobileActiveIndex;
                                return (
                                    <motion.div 
                                        key={`mob-${cert.id}`} 
                                        className="cert-mobile-card"
                                        animate={{ 
                                            opacity: isActive ? 1 : 0.8,
                                            scale: isActive ? 1 : 0.98
                                        }}
                                        transition={{ duration: 0.4 }}
                                        onClick={() => setSelectedCert(cert)}
                                    >
                                        <div className="cert-mobile-image">
                                            <img src={cert.image} alt={cert.title} loading="lazy" />
                                            <div className="cert-mobile-tag">{cert.issuer}</div>
                                        </div>
                                        <div className="cert-mobile-info">
                                            <h3 className="cert-mobile-title">{cert.title}</h3>
                                            <span className="cert-mobile-date">{cert.date}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                        
                        {/* Clean Dot Indicators for Mobile */}
                        <div className="cert-mobile-indicators">
                            {certificationsData.map((_, idx) => (
                                <div 
                                    key={`mi-${idx}`} 
                                    className={`mi-dot ${idx === mobileActiveIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.section>

                <CertificationModal 
                    cert={selectedCert} 
                    isOpen={!!selectedCert} 
                    onClose={() => setSelectedCert(null)} 
                />

            </div>
        </section>
    );
};

export default About;

