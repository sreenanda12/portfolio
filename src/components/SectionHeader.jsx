import React from 'react';
import { motion } from 'framer-motion';
import './SectionHeader.css';

const SectionHeader = ({ title, id, label, highlight }) => {
    // Basic highlighted text logic
    const renderTitle = () => {
        if (!highlight) return title;
        const parts = title.split(highlight);
        return (
            <>
                {parts[0]}
                <span className="text-highlight">{highlight}</span>
                {parts[1]}
            </>
        );
    };

    return (
        <section id={id} className="section-header-component">
            <motion.div 
                className="section-header-content"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {label && <span className="section-label">{label}</span>}
                <h2 className="header-title">{renderTitle()}</h2>
                <div className="section-divider"></div>
            </motion.div>
        </section>
    );
};

export default SectionHeader;
