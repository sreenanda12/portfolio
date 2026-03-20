import React, { useState, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import './WorkGallery.css';

const projects = [
    { id: 1, title: 'VR Interactive Experience', category: 'UI Design', color: '#F24E1E', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Brand Identity Reloaded', category: 'Logo Design', color: '#1877F2', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'E-Commerce Redesign', category: 'Web Design', color: '#31A8FF', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Summer Festival Campaign', category: 'Social Media', color: '#FF9A00', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Corporate Branding Kit', category: 'Branding', color: '#00C4CC', img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Gamified App Flow', category: 'UI Design', color: '#9999FF', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' },
];

const WorkGallery = () => {
    const [filter, setFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.category === filter));
        }
    }, [filter]);

    return (
        <motion.section 
            id="work-gallery" 
            className="section gallery-section"
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
            <div className="container" style={{ maxWidth: '100%', padding: 0 }}>


                {/* CONTINUOUS MARQUEE SCROLL (Right to Left) */}
                <motion.div 
                    className="marquee-wrapper"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
                    }}
                >
                    <div className="marquee-track">
                        {/* Duplicate lists to create an infinite loop effect */}
                        {[...projects, ...projects, ...projects].map((project, idx) => (
                            <div
                                className="marquee-card multicolor-marquee"
                                key={idx}
                                style={{ 
                                    backgroundColor: project.color,
                                    '--proj-color': project.color,
                                    '--proj-glow': project.color + '40'
                                 }}
                                onClick={() => setSelectedProject(project)}
                            >
                                <img src={project.img} alt={project.title} className="marquee-bg-img" />
                                <div className="marquee-text-overlay">
                                    <h3>{project.category.toUpperCase()}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* MORE INFO ICON BUTTON */}
                <motion.div 
                    className="more-info-container"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
                    }}
                >
                    <a
                        href="#/design-stories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="more-info-btn link-external"
                    >
                        <Maximize2 size={28} />
                        <span>View More</span>
                    </a>
                </motion.div>

            </div>

            {/* FULLSCREEN PROJECT DETAILS MODAL */}
            {selectedProject && (
                <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setSelectedProject(null)}>✕</button>
                        <div className="project-modal-header">
                            <h3 className="modal-title" style={{ marginBottom: '0.5rem' }}>{selectedProject.title}</h3>
                            <span className="project-category" style={{ transform: 'none' }}>{selectedProject.category}</span>
                        </div>
                        <div className="project-modal-image">
                            <img src={selectedProject.img} alt={selectedProject.title} />
                        </div>
                        <div className="project-modal-details" style={{ marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
                            <p>Here you can explore more details about <strong>{selectedProject.title}</strong>, understanding the creative process, UI flow, and the impact of the final delivery. The vibrant colors and interactive layout highlight the design thinking involved.</p>
                        </div>
                    </div>
                </div>
            )}
        </motion.section>
    );
};

export default WorkGallery;
