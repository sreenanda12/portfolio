import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';

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

const MySkills = () => {
    const [activeSkill, setActiveSkill] = useState(null);

    return (
        <section id="my-skills" className="about-section skills-section">
            <div className="container">
                <div className="skills-pill-container">
                    {skillsData.map((skill, index) => (
                        <motion.button
                            key={skill.name}
                            className={`skill-pill ${activeSkill === skill.name ? 'active' : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, borderColor: '#FF5A1F' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                        >
                            <span className="skill-icon">{skill.icon}</span>
                            {skill.name}
                            {activeSkill === skill.name && <motion.div className="skill-ripple" layoutId="ripple" />}
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MySkills;
