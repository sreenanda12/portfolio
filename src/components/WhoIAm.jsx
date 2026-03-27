import React from 'react';
import { motion } from 'framer-motion';
import './About.css'; // Reusing styles

const WhoIAm = () => {
    return (
        <section id="who-i-am" className="about-section intro-section">
            <div className="container">
                <div className="intro-grid">
                    <div className="intro-image-wrapper">
                        <motion.div 
                            className="portrait-container"
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                            whileHover={{ 
                                rotateX: 10, 
                                rotateY: 10, 
                                perspective: 1000,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <img src="/who.jpeg" alt="Muhammed Muflih A" className="portrait-img" loading="lazy" decoding="async" />
                            <div className="shape shape-1"></div>
                            <div className="shape shape-2"></div>
                            <div className="shape shape-3"></div>
                            <div className="shape shape-4"></div>
                        </motion.div>
                    </div>

                    <div className="intro-text">
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        >
                            Creative UI & Graphic Designer with 5+ years of experience crafting visually engaging designs across web, mobile, and digital marketing platforms. Skilled in Figma, Adobe Photoshop, Illustrator, Premiere Pro, and Canva, with a strong focus on brand-driven visuals, social media creatives, and user-centered design. Passionate about transforming ideas into impactful digital experiences that elevate brand identity and audience engagement. Currently seeking an opportunity in the UAE to contribute to innovative and growth-focused creative teams.
                        </motion.p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoIAm;
