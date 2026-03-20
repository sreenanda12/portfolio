import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import './Education.css';

const educationData = [
    {
        degree: "M.Com – E-Commerce",
        year: "2023",
        institution: "Annamalai University",
        icon: <GraduationCap size={24} />
    },
    {
        degree: "B.Com – Co-Operation",
        year: "2020",
        institution: "Kerala University",
        icon: <Award size={24} />
    },
    {
        degree: "Higher Secondary (+2)",
        year: "SCERT",
        institution: "CPHSS Kuttikkadu",
        icon: <GraduationCap size={24} />
    }
];

const Education = () => {
    return (
        <section id="education" className="education-grid-section">
            <div className="container">
                <div className="edu-compact-grid">
                    {educationData.map((edu, index) => (
                        <motion.div 
                            key={edu.degree}
                            className="edu-card-compact"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="edu-icon-bg">{edu.icon}</div>
                            <div className="edu-text">
                                <span className="edu-year-small">{edu.year}</span>
                                <h3 className="edu-degree-small">{edu.degree}</h3>
                                <p className="edu-inst-small">{edu.institution}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
