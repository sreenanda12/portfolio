import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ToolGrid3D from './ToolGrid3D';
import './Hero.css';

const Hero = () => {
    const { theme } = useTheme();
    const [keywordIndex, setKeywordIndex] = useState(0);
    const keywords = ["UI/UX Designer", "Graphic Designer", "Digital Marketing Professional"];

    // Mouse Parallax Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth Spring for Parallax
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transforms for Minimal Shift (10-15px)
    const translateX = useTransform(springX, [-0.5, 0.5], ["-15px", "15px"]);
    const translateY_parallax = useTransform(springY, [-0.5, 0.5], ["-15px", "15px"]);

    useEffect(() => {
        const timer = setInterval(() => {
            setKeywordIndex((prev) => (prev + 1) % keywords.length);
        }, 2000);

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth) - 0.5;
            const y = (clientY / innerHeight) - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            clearInterval(timer);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY]);

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
                {/* CONTENT (LEFT) */}
                <div className="hero-content">
                    <motion.h1 className="hero-title" variants={itemVariants}>
                        MUHAMMAD <br /> MUFLIH
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

                {/* VISUAL SIDE (RIGHT) */}
                <div className="hero-visual-side">
                    <motion.div 
                        className="hero-image-wrapper-parallax"
                        style={{ x: translateX, y: translateY_parallax }}
                    >
                        <motion.div 
                            className="hero-image-container"
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                y: 0,
                                transition: { duration: 1, ease: "easeOut", delay: 0.3 } 
                            }}
                        >
                            <motion.img 
                                src={theme === 'dark' ? '/hero-dark.png' : '/hero-light.png'} 
                                alt="MUHAMMAD MUFLIH" 
                                className="hero-main-image"
                                animate={{
                                    y: [-10, 10, -10],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="hero-tools-cluster-3d"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }
                        }}
                    >
                        <ToolGrid3D isHero={true} />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
