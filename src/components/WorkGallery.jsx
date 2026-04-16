import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WorkGallery.css';

export const projects = [
    // UI Designs
    { id: 1, title: 'VR Nexus Interface', category: 'UI Designs', tint: 'yellow', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Fintech Dashboard', category: 'UI Designs', tint: 'green', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Health Tracking App', category: 'UI Designs', tint: 'purple', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' },
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

const WorkGallery = ({ fullView = false, title = "Portfolio" }) => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const filterRefs = useRef({});
    const marqueeRef = useRef(null);
    const [isSwiping, setIsSwiping] = useState(false);

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

    // AUTO-SCROLL LOADER FOR MOBILE MARQUEE
    useEffect(() => {
        let scrollInterval;
        const container = marqueeRef.current;
        if (container) {
            scrollInterval = setInterval(() => {
                if (!isSwiping) {
                    container.scrollLeft += 1.5; // Increased speed as requested
                    // Reset to middle if it hits the end 
                    if (container.scrollLeft >= (container.scrollWidth / 3) * 2) {
                        container.scrollLeft = container.scrollWidth / 3;
                    }
                }
            }, 20); // Faster speed control
        }
        return () => clearInterval(scrollInterval);
    }, [isSwiping]);

    const handleFilterClick = (cat, isDesktop = true) => {
        setActiveFilter(cat);
        // Auto-center clicked item only on desktop (prevents jumping marquee)
        if (isDesktop && filterRefs.current[cat]) {
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
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
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
                        
                        {/* Desktop Static View - Show on Laptop/Desktop */}
                        <div className="gallery-filters desktop-only">
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
                                            className="active-underline-orange"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Infinite Marquee View - Show on Mobile Only */}
                        <div 
                            className="gallery-filters-marquee-mobile mobile-only"
                            ref={marqueeRef}
                            onScroll={() => {
                                // Basic loop logic on manual scroll
                                const container = marqueeRef.current;
                                if (container) {
                                    if (container.scrollLeft <= 0) container.scrollLeft = container.scrollWidth / 3;
                                    if (container.scrollLeft >= (container.scrollWidth / 3) * 2) container.scrollLeft = container.scrollWidth / 3;
                                }
                            }}
                            onTouchStart={() => setIsSwiping(true)}
                            onTouchEnd={() => setIsSwiping(false)}
                            onTouchCancel={() => setIsSwiping(false)}
                            onMouseDown={() => setIsSwiping(true)}
                            onMouseUp={() => setIsSwiping(false)}
                            onMouseLeave={() => setIsSwiping(false)}
                        >
                            <div className="marquee-track">
                                {[...['ALL', 'UI DESIGN', 'WEB DESIGN', 'LOGO FOLIO', 'SOCIAL MEDIA'], ...['ALL', 'UI DESIGN', 'WEB DESIGN', 'LOGO FOLIO', 'SOCIAL MEDIA'], ...['ALL', 'UI DESIGN', 'WEB DESIGN', 'LOGO FOLIO', 'SOCIAL MEDIA']].map((label, idx) => {
                                    // Map label back to original functional category
                                    const functionalCat = label === 'UI DESIGN' ? 'UI DESIGNS' : label === 'WEB DESIGN' ? 'WEB DESIGNS' : label;
                                    return (
                                        <button
                                            key={`${label}-${idx}`}
                                            className={`filter-marquee-pill ${activeFilter === functionalCat ? 'active' : ''}`}
                                            onClick={() => handleFilterClick(functionalCat, false)}
                                        >
                                            <span className="cat-text">{label}</span>
                                            {activeFilter === functionalCat && (
                                                <div className="active-dot"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '4rem' }}>
                <div className="gallery-grid-wrapper">
                    <motion.div 
                        className="gallery-responsive-grid-premium"
                        layout
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className={`premium-card interactive tint-${project.tint}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    layout
                                >
                                    <div className="premium-card-inner">
                                        <div className="premium-card-image">
                                            <img src={project.img} alt={project.title} loading="lazy" decoding="async" />
                                            <div className="premium-tint-overlay"></div>
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
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {!fullView && (
                    <div className="gallery-minimal-footer">
                        <Link to="/design-stories" className="view-more-btn-premium">
                            View More <span className="arrow">→</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* Project Details Modal Content... Removed for clarity but kept in original */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div className="p-full-overlay" initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }}>
                        {/* ... Modal Details Content ... */}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default WorkGallery;
