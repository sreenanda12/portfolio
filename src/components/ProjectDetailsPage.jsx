import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from './WorkGallery';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Briefcase, Award } from 'lucide-react';
import './ProjectDetailsPage.css';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
        if (project) {
            document.title = `${project.title} | Portfolio`;
        }
    }, [project]);

    if (!project) {
        return (
            <div className="not-found-container">
                <h1>Project Not Found</h1>
                <Link to="/" className="back-link">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="project-detail-page">
            <nav className="detail-nav">
                <div className="container">
                    <Link to="/" className="back-btn-pill">
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </Link>
                </div>
            </nav>

            <main className="container detail-content">
                <motion.div 
                    className="detail-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="p-category">{project.category}</span>
                    <h1 className="p-title">{project.title}</h1>
                </motion.div>

                <motion.div 
                    className="p-main-image-wrap"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <img src={project.img} alt={project.title} className="p-hero-img" />
                    <div className="p-image-glow"></div>
                </motion.div>

                <div className="p-info-grid">
                    <motion.div 
                        className="p-description"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3>Project Overview</h3>
                        <p>This project showcases a deep immersion into the world of creative problem-solving. Through iterative design cycles and user-centric focus, I transformed complex requirements into a visual narrative that resonates with the target audience. The goal was to elevate brand presence while ensuring a seamless, intuitive experience across all touchpoints.</p>
                        <p>Leveraging modern tools and a minimalist aesthetic, we focused on high-density details and refined typography to deliver a product that feels both premium and timeless.</p>
                    </motion.div>

                    <motion.div 
                        className="p-specs-card"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="spec-item">
                            <Calendar size={20} className="spec-icon" />
                            <div className="spec-text">
                                <span>Timeline</span>
                                <strong>8 Weeks (Q1 2026)</strong>
                            </div>
                        </div>
                        <div className="spec-item">
                            <Briefcase size={20} className="spec-icon" />
                            <div className="spec-text">
                                <span>Role</span>
                                <strong>Lead Designer</strong>
                            </div>
                        </div>
                        <div className="spec-item">
                            <Award size={20} className="spec-icon" />
                            <div className="spec-text">
                                <span>Client</span>
                                <strong>Innovative Digital Solutions</strong>
                            </div>
                        </div>
                        <div className="spec-item">
                            <ExternalLink size={20} className="spec-icon" />
                            <div className="spec-text">
                                <span>Live Demo</span>
                                <a href="#" target="_blank" rel="noopener noreferrer">Visit Website</a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <footer className="detail-footer">
                <div className="container">
                    <div className="divider"></div>
                    <div className="footer-links">
                        <Link to="/" className="footer-home-link"> Muflhi.Portfolio </Link>
                        <span>© 2026 All Rights Reserved</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ProjectDetailsPage;
