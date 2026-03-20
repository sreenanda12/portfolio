import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

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

const MyTools = () => {
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
