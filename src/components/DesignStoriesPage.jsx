import React, { useState, useEffect } from 'react';
import { Maximize2, ArrowLeft } from 'lucide-react';
import './DesignStoriesPage.css';

const projects = [
    { id: 1, title: 'VR Interactive Experience', category: 'UI Design', color: '#6366F1', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Brand Identity Reloaded', category: 'Logo Design', color: '#EC4899', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'E-Commerce Redesign', category: 'Web Design', color: '#10B981', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Summer Festival Campaign', category: 'Social Media', color: '#F59E0B', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Corporate Branding Kit', category: 'Branding', color: '#3B82F6', img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Gamified App Flow', category: 'UI Design', color: '#8B5CF6', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' },
];

const categories = ['All', 'UI Design', 'Logo Design', 'Web Design', 'Social Media', 'Branding'];

const DesignStoriesPage = () => {
    const [filter, setFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "DESIGN STORIES";
        return () => {
            document.title = "Portfolio";
        };
    }, []);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.category === filter));
        }
    }, [filter]);

    return (
        <div className="design-stories-page">
            <header className="stories-header">
                <button
                    className="back-btn"
                    onClick={() => window.close()}
                    title="Close Window"
                >
                    <ArrowLeft size={24} />
                    <span>Back to Portfolio</span>
                </button>
            </header>

            <main className="container stories-main">
                <h1 className="stories-title-main">DESIGN STORIES</h1>

                <div className="stories-filters">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="stories-grid">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="stories-card"
                            style={{ backgroundColor: project.color }}
                        >
                            <div className="stories-image-wrapper">
                                <img src={project.img} alt={project.title} loading="lazy" />
                                <div className="stories-overlay">
                                    <span className="project-category">{project.category}</span>
                                    <h3 className="project-title">{project.title}</h3>
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="view-project-btn btn"
                                        aria-label="View Project"
                                    >
                                        <span>View Work</span>
                                        <Maximize2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

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
        </div>
    );
};

export default DesignStoriesPage;
