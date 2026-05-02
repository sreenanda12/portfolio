import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './About.css';

const toolsData = [
    { name: 'Figma', level: 95, icon: '/icons/figma update .png' },
    { name: 'Photoshop', level: 85, icon: '/icons/ps%20roboto.png' },
    { name: 'Illustrator', level: 88, icon: '/icons/illustrator.png' },
    { name: 'Adobe XD', level: 75, icon: '/icons/xd.png' },
    { name: 'Premiere Pro', level: 70, icon: '/icons/premiere.png' },
    { name: 'Blender', level: 75, icon: '/icons/blender.png' },
    { name: 'Claude', level: 80, icon: '/icons/claude.png' },
    { name: 'HTML5', level: 85, icon: '/icons/html.png' },
    { 
        name: 'WordPress', 
        level: 80, 
        icon: { 
            light: '/icons/word press light.png', 
            dark: '/icons/word press dark.png' 
        } 
    },
    { 
        name: 'Microsoft Office', 
        level: 90, 
        icon: { 
            light: '/icons/ms office light.png', 
            dark: '/icons/ms office dark.png' 
        } 
    },
    { 
        name: 'Unreal Engine', 
        level: 65, 
        icon: { 
            light: '/icons/unity.png', 
            dark: '/icons/unity logo white.png' 
        } 
    },
    { 
        name: 'Unity', 
        level: 75, 
        icon: { 
            light: '/icons/unitylogo.png', 
            dark: '/icons/unity logo light.png' 
        } 
    }
];

const MyTools = () => {
    const { theme } = useTheme();
    return (
        <section id="my-tools" className="about-section tools-section">
            <div className="container">
                <div className="tools-grid">
                    {toolsData.map((tool, index) => (
                        <motion.div 
                            key={tool.name} 
                            className="tool-item-compact"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="tool-icon-box">
                                <img 
                                    src={typeof tool.icon === 'object' ? (theme === 'dark' ? tool.icon.dark : tool.icon.light) : tool.icon} 
                                    alt={tool.name} 
                                    className="tool-icon-img" 
                                />
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
                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                                    ></motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyTools;
