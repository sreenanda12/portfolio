import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WorkGallery.css';

export const projects = [
    // UI DESIGNS & BRANDING (The 7 works with PDF downloads)
    { 
        id: 1, 
        title: 'PAWMIGO', 
        category: 'UI DESIGNS', 
        tag: 'UI/UX Case Study', 
        description: 'Complete pet adoption platform design focusing on user flow and clarity.', 
        tint: 'yellow', 
        img: '/pawmigo th.png',
        pdf: '/work-1-11.pdf'
    },
    { 
        id: 2, 
        title: 'VYAPARIONLINE', 
        category: 'UI DESIGNS', 
        tag: 'UI/UX Case Study', 
        description: 'B2B/B2C hybrid e-commerce platform with dual shopping modes.', 
        tint: 'green', 
        img: '/vyaparionline th.png',
        pdf: '/work-12-23.pdf'
    },
    { 
        id: 3, 
        title: 'Home Remedy', 
        category: 'BRANDING', 
        tag: 'Brand Identity', 
        description: 'Complete brand identity and visual language for a wellness clinic.', 
        tint: 'purple', 
        img: '/hoome remedy.jpeg',
        pdf: '/work-24-27.pdf'
    },
    { 
        id: 4, 
        title: 'BFEC', 
        category: 'BRANDING', 
        tag: 'Brand Identity', 
        description: 'Corporate branding and marketing collateral for educational consultants.', 
        tint: 'pink', 
        img: '/bfec 2 th.png',
        pdf: '/work-28-33.pdf'
    },
    { 
        id: 5, 
        title: 'SAALINE DECOR', 
        category: 'BRANDING', 
        tag: 'Brand Identity', 
        description: 'Luxury interior design brand identity and promotional materials.', 
        tint: 'yellow', 
        img: '/saaline decore th.png',
        pdf: '/work-34-36.pdf'
    },
    { 
        id: 6, 
        title: 'WARE PULSE', 
        category: 'BRANDING', 
        tag: 'Brand Identity', 
        description: 'Modern logistics and warehousing management brand identity.', 
        tint: 'green', 
        img: '/warepulse th.png',
        pdf: '/work-37-38.pdf'
    },
    { 
        id: 7, 
        title: 'ARABIC VALLEY', 
        category: 'BRANDING', 
        tag: 'Brand Identity', 
        description: 'Traditional products branding reflecting cultural heritage.', 
        tint: 'purple', 
        img: '/arabic vally mt.png',
        pdf: '/work-39-41.pdf'
    },

    // WEB DESIGNS (Live Sites)
    { 
        id: 8, 
        title: 'Phoenix GM UAE', 
        category: 'WEB DESIGNS', 
        tag: 'Web Development', 
        description: 'Corporate website for a global management group in UAE.', 
        tint: 'pink', 
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        url: 'https://phoenixgmuae.com/'
    },
    { 
        id: 9, 
        title: 'Saaline Decor', 
        category: 'WEB DESIGNS', 
        tag: 'Web Development', 
        description: 'E-commerce and portfolio site for interior decor services.', 
        tint: 'yellow', 
        img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800',
        url: 'https://saalinedecor.ae/home/'
    },
    { 
        id: 10, 
        title: 'Saad Al Barakat', 
        category: 'WEB DESIGNS', 
        tag: 'Web Development', 
        description: 'Online store for luxury gifts and traditional products.', 
        tint: 'green', 
        img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
        url: 'https://saadalbarakat.com/home/'
    },
    { 
        id: 11, 
        title: 'Mazreen CGM', 
        category: 'WEB DESIGNS', 
        tag: 'Web Development', 
        description: 'Professional cleaning services platform in the UAE.', 
        tint: 'purple', 
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        url: 'https://mazreencgm.com/'
    },
    { 
        id: 12, 
        title: 'Indo Arab School', 
        category: 'WEB DESIGNS', 
        tag: 'Web Development', 
        description: 'Educational portal for Indo-Arab academic services.', 
        tint: 'pink', 
        img: 'https://images.unsplash.com/photo-1558002038-103790319658?auto=format&fit=crop&q=80&w=800',
        url: 'https://indoarabschool.com/'
    },
    { 
        id: 13, 
        title: 'Hyzin Data Systems', 
        category: 'WEB DESIGNS', 
        tag: 'Web Development', 
        description: 'Technology and data management solutions website.', 
        tint: 'yellow', 
        img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
        url: 'https://hyzindatasystems.com/'
    },
    { 
        id: 14, 
        title: 'Multysense Group', 
        category: 'WEB DESIGNS', 
        tag: 'Web Development', 
        description: 'Multi-vertical business group corporate platform.', 
        tint: 'green', 
        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
        url: 'https://multysensegroup.com/'
    },
    { 
        id: 15, 
        title: 'Multysense Org', 
        category: 'WEB DESIGNS', 
        tag: 'Web Development', 
        description: 'Non-profit organization platform for social initiatives.', 
        tint: 'purple', 
        img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
        url: 'https://multysense.org/'
    },
];

const categories = ['ALL', 'UI DESIGNS', 'BRANDING', 'WEB DESIGNS'];

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
                                            className="active-underline-indicator"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.35, ease: "circOut" }}
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
                                {[...['ALL', 'UI DESIGN', 'BRANDING', 'WEB DESIGN'], ...['ALL', 'UI DESIGN', 'BRANDING', 'WEB DESIGN'], ...['ALL', 'UI DESIGN', 'BRANDING', 'WEB DESIGN']].map((label, idx) => {
                                    // Map label back to original functional category
                                    const functionalCat = label === 'UI DESIGN' ? 'UI DESIGNS' : label === 'WEB DESIGN' ? 'WEB DESIGNS' : label;
                                    return (
                                        <button
                                            key={`${label}-${idx}`}
                                            className={`filter-marquee-pill ${activeFilter === functionalCat ? 'active' : ''}`}
                                            onClick={() => handleFilterClick(functionalCat, false)}
                                        >
                                            <span className="cat-text">
                                                {label}
                                                {activeFilter === functionalCat && (
                                                    <motion.div 
                                                        layoutId="activeUnderlineMobile"
                                                        className="active-underline-indicator-mobile"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.35, ease: "circOut" }}
                                                    />
                                                )}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '1rem' }}>
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
                                    transition={{ duration: 0.3, delay: (index % 4) * 0.05 }}
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
                                                <div className="reveal-top-meta">
                                                    <span className="reveal-tag">{project.tag}</span>
                                                </div>
                                                <h3 className="reveal-title">{project.title}</h3>
                                                <p className="reveal-description">{project.description}</p>
                                                
                                                {project.pdf ? (
                                                    <a 
                                                        href={project.pdf} 
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="reveal-view-btn"
                                                    >
                                                        View Project
                                                    </a>
                                                ) : project.url ? (
                                                    <a 
                                                        href={project.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="reveal-view-btn"
                                                    >
                                                        View Project
                                                    </a>
                                                ) : (
                                                    <Link 
                                                        to={`/project/${project.id}`} 
                                                        className="reveal-view-btn"
                                                        target="_blank"
                                                    >
                                                        View Project
                                                    </Link>
                                                )}
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
