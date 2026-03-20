import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WorkGallery.css';

export const projects = [
    // UI Designs
    { id: 1, title: 'VR Nexus Interface', category: 'UI Designs', tint: 'yellow', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Fintech Dashboard', category: 'UI Designs', tint: 'green', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Health Tracking App', category: 'UI Designs', tint: 'purple', img: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Smart Home Hub', category: 'UI Designs', tint: 'pink', img: 'https://images.unsplash.com/photo-1558002038-103790319658?auto=format&fit=crop&q=80&w=800' },
    
    // Web Designs
    { id: 5, title: 'Architect Portfolio', category: 'Web Designs', tint: 'purple', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Travel Landing Page', category: 'Web Designs', tint: 'pink', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800' },
    { id: 7, title: 'E-Commerce Store', category: 'Web Designs', tint: 'yellow', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800' },
    { id: 8, title: 'Modern SaaS Site', category: 'Web Designs', tint: 'green', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },

    // Logo Folio
    { id: 9, title: 'Abstract Studio', category: 'Logo Folio', tint: 'pink', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' },
    { id: 10, title: 'Tech Pulse Identity', category: 'Logo Folio', tint: 'yellow', img: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800' },
    { id: 11, title: 'Eco Friendly Branding', category: 'Logo Folio', tint: 'green', img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800' },
    { id: 12, title: 'Urban Flow Logo', category: 'Logo Folio', tint: 'purple', img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800' },

    // Social Media
    { id: 13, title: 'Summer Campaign', category: 'Social Media', tint: 'green', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' },
    { id: 14, title: 'Fashion Carousel', category: 'Social Media', tint: 'purple', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800' },
    { id: 15, title: 'Tech Gadget Launch', category: 'Social Media', tint: 'pink', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800' },
    { id: 16, title: 'Foodies Instagram Kit', category: 'Social Media', tint: 'yellow', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800' },
];

const categories = ['ALL', 'UI DESIGNS', 'WEB DESIGNS', 'LOGO FOLIO', 'SOCIAL MEDIA'];

// High-End 3D Tilt Card Component
const TiltCard = ({ project, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={`premium-card tint-${project.tint}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
            <div className="premium-card-inner" style={{ transform: "translateZ(50px)" }}>
                <div className="premium-card-image">
                    <img src={project.img} alt={project.title} />
                    <div className="premium-tint-overlay"></div>
                    <div className="premium-shimmer"></div>
                </div>
                
                <div className="premium-reveal-overlay-hover">
                    <div className="reveal-content">
                        <span className="reveal-category">{project.category}</span>
                        <h3 className="reveal-title">{project.title}</h3>
                        <Link 
                            to={`/project/${project.id}`} 
                            className="reveal-view-btn"
                            target="_blank"
                        >
                            View Project
                        </Link>
                    </div>
                </div>
            </div>
            {/* Soft Edge Glow Accent */}
            <div className="p-card-accent-glow"></div>
        </motion.div>
    );
};

const WorkGallery = ({ fullView = false, title = "portfolio" }) => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const filterRefs = useRef({});

    useEffect(() => {
        let result = projects;
        if (activeFilter !== 'ALL') {
            result = projects.filter(p => p.category.toUpperCase() === activeFilter);
        }
        
        if (activeFilter === 'ALL' && !fullView) {
            result = [...result].sort(() => Math.random() - 0.5);
        }

        setFilteredProjects(fullView ? result : result.slice(0, 4));
    }, [activeFilter, fullView]);

    const handleFilterClick = (cat) => {
        setActiveFilter(cat);
        if (filterRefs.current[cat]) {
            filterRefs.current[cat].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    };

    return (
        <section className={`gallery-section ${fullView ? 'full-gallery' : ''}`} id="portfolio">
            <div className="gallery-header">
                <div className="container">
                    <motion.h2 
                        className="gallery-main-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {title}
                    </motion.h2>
                </div>
            </div>

            <div className="gallery-filters-area">
                <div className="container">
                    <div className="gallery-filters-scroll-wrap">
                        <div className="gallery-filters-mask left"></div>
                        <div className="gallery-filters-mask right"></div>
                        <div className="gallery-filters">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    ref={el => filterRefs.current[cat] = el}
                                    className={`filter-btn-premium ${activeFilter === cat ? 'active' : ''}`}
                                    onClick={() => handleFilterClick(cat)}
                                >
                                    {cat}
                                    {activeFilter === cat && (
                                        <motion.div 
                                            layoutId="activeUnderline"
                                            className="active-underline-gradient"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '4rem' }}>
                <div className="gallery-grid-wrapper">
                    <motion.div className="gallery-responsive-grid-premium" layout>
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <TiltCard key={project.id} project={project} index={index} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {!fullView && (
                    <div className="gallery-minimal-footer">
                        <div className="minimal-divider"></div>
                        <Link to="/design-stories" className="view-more-text">
                            View More <span className="arrow">→</span>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WorkGallery;
