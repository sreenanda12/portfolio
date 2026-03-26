import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingToolsGrid from './FloatingToolsGrid';
import './Hero.css';

const Hero = () => {
    const [keywordIndex, setKeywordIndex] = useState(0);
    const keywords = ["UI/UX Designer", "Graphic Designer", "Digital Marketing Professional"];

    useEffect(() => {
        const timer = setInterval(() => {
            setKeywordIndex((prev) => (prev + 1) % keywords.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-vignette"></div>
            <motion.div 
                className="hero-container container"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* CONTENT */}
                <div className="hero-content">
                    <motion.h1 className="hero-title" variants={itemVariants}>
                        MUHAMMED <br /> MUFLIH A
                    </motion.h1>

                    <motion.div className="keyword-rotator" variants={itemVariants}>
                        <span className="keyword-static">Expert</span>
                        <div className="keyword-dynamic">
                            {keywords[keywordIndex]}
                        </div>
                    </motion.div>

                    <motion.p className="hero-description" variants={itemVariants}>
                        Creative UI/UX Designer specialized in creating engaging user experiences through gamification, 3D visuals, and micro-interactions.
                    </motion.p>
                </div>

                {/* RIGHT SIDE / TOOL CLUSTER */}
                <motion.div 
                    className="hero-tools-cluster-3d"
                    variants={{
                        hidden: { opacity: 0, scale: 0.9, x: 20 },
                        visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } }
                    }}
                >
                    <FloatingToolsGrid />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
