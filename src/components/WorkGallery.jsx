import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Info, ChevronDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import DesignStoriesPage from './DesignStoriesPage';
import './WorkGallery.css';

const projects = [
    { id: 1, title: 'VR Interactive Experience', category: 'UI Design', color: '#6366F1', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Brand Identity Reloaded', category: 'Logo Design', color: '#EC4899', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'E-Commerce Redesign', category: 'Web Design', color: '#10B981', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Summer Festival Campaign', category: 'Social Media', color: '#F59E0B', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Corporate Branding Kit', category: 'Branding', color: '#3B82F6', img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Gamified App Flow', category: 'UI Design', color: '#8B5CF6', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' },
];

const categories = ['All', 'UI Design', 'Logo Design', 'Web Design', 'Social Media', 'Branding'];

const WorkGallery = () => {
    const [filter, setFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showStories, setShowStories] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.category === filter));
        }
    }, [filter]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const toggleStories = () => {
        // Check if device is mobile (width < 768px as standard)
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Open in new window for mobile as requested
            window.open('/design-stories', '_blank');
        } else {
            // Standard toggle for desktop
            setShowStories(!showStories);
        }
    };

    return (
        <section id="gallery" className="section gallery-section" ref={sectionRef}>
            <div className="container" style={{ maxWidth: '100%', padding: 0 }}>

                <h2 className="animated-gradient-title" style={{ paddingLeft: '2rem' }}>WORK GALLERY</h2>

                {/* CONTINUOUS MARQUEE SCROLL (Right to Left) */}
                <div className="marquee-wrapper">
                    <div className="marquee-track">
                        {/* Duplicate lists to create an infinite loop effect */}
                        {[...projects, ...projects, ...projects].map((project, idx) => (
                            <div
                                className="marquee-card multicolor-marquee"
                                key={idx}
                                style={{ backgroundColor: project.color }}
                                onClick={() => setSelectedProject(project)}
                            >
                                <img src={project.img} alt={project.title} className="marquee-bg-img" />
                                <div className="marquee-text-overlay">
                                    <h3>{project.category.toUpperCase()}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MORE INFO ICON BUTTON */}
                <div className="more-info-container">
                    <button
                        onClick={toggleStories}
                        className="more-info-btn"
                    >
                        <Maximize2 size={28} style={{ transform: showStories ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                        <span>{showStories ? 'View Less' : 'View More'}</span>
                    </button>
                </div>

                {/* SHOW STORIES IN-PLACE */}
                {showStories && (
                    <div className="expanded-stories-section animate-fade-in-up">
                        <DesignStoriesPage isComponent={true} />
                    </div>
                )}

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
        </section>
    );
};

export default WorkGallery;
