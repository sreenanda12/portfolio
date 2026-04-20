import React from 'react';
import { motion } from 'framer-motion';
import './About.css'; 

const WhoIAm = () => {
    return (
        <section className="about-section intro-section" id="who-i-am">
            <div className="container">
                {/* CENTERED HEADING */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="who-i-am-heading">Who I Am</h2>
                </motion.div>

                <div className="intro-grid">
                    
                    {/* LEFT COLUMN: IMAGE */}
                    <motion.div 
                        className="intro-image-wrapper"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="portrait-container">
                            <motion.img 
                                src="/who.jpeg" 
                                alt="Muhammad Muflih - Creative Designer" 
                                className="portrait-img" 
                                loading="lazy" 
                                decoding="async"
                                whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
                            />
                        </div>
                    </motion.div>

                    <motion.div 
                        className="intro-text"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <div className="intro-paragraphs">
                            <p>
                                Creative UI & Graphic Designer with 5+ years of experience crafting visually engaging designs across web, mobile, and digital marketing platforms. Skilled in Figma, Adobe Photoshop, Illustrator, Premiere Pro, and Canva, with a strong focus on brand-driven visuals, social media creatives, and user-centered design.
                            </p>
                            <p>
                                Passionate about transforming ideas into impactful digital experiences that elevate brand identity and audience engagement. Currently seeking an opportunity in the UAE to contribute to innovative and growth-focused creative teams.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhoIAm;
