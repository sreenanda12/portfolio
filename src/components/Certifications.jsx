import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './About.css';
import './Certifications.css';
import CertificationModal from './CertificationModal';
import { allCertificates } from './certificatesData';



const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Mobile state
    const [isMobileInteracting, setIsMobileInteracting] = useState(false);

    const goNext = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % allCertificates.length);
    }, []);

    const goPrev = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + allCertificates.length) % allCertificates.length);
    }, []);

    const goTo = useCallback((idx) => {
        setCurrentIndex(idx);
    }, []);

    // Auto-slide: Global
    useEffect(() => {
        if (isPaused || selectedCert || isMobileInteracting) return;
        const interval = setInterval(goNext, 4000); // 4 seconds as requested
        return () => clearInterval(interval);
    }, [isPaused, selectedCert, isMobileInteracting, goNext]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (selectedCert) return;
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [selectedCert, goNext, goPrev]);

    const handleDragEnd = (event, info) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
            goNext();
        } else if (info.offset.x > threshold) {
            goPrev();
        }
    };

    return (
        <section id="certifications" className="about-section certifications-section">
            <div className="container">
                <div className="cert-bg-decoration"></div>

                {/* ═══ PREMIUM SLIDER (Unified for Responsive) ═══ */}
                <div className="cert-premium-wrapper">
                    
                    <div 
                        className="cert-premium-stage"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsMobileInteracting(true)}
                        onTouchEnd={() => setTimeout(() => setIsMobileInteracting(false), 2000)}
                    >
                        {/* SOFT SPOTLIGHT */}
                        <div className="cert-spotlight" />

                        {/* PREV BUTTON */}
                        <button className="cert-arrow cert-arrow-left" onClick={goPrev} aria-label="Previous">
                            <ChevronLeft size={22} />
                        </button>

                        {/* SLIDER VIEWPORT */}
                        <div className="cert-slider-viewport">
                            <motion.div 
                                className="cert-slider-track"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={handleDragEnd}
                                animate={{ x: `calc(-${currentIndex * 100}% )` }}
                                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                            >
                                {allCertificates.map((cert, index) => {
                                    const isActive = index === currentIndex;
                                    return (
                                        <div 
                                            key={cert.id} 
                                            className={`cert-item ${isActive ? 'active' : ''}`}
                                        >
                                            <motion.div 
                                                className="cert-premium-card"
                                                animate={{ 
                                                    scale: isActive ? 1 : 0.85,
                                                    opacity: isActive ? 1 : 0.4
                                                }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="cert-premium-image-wrap">
                                                    <img 
                                                        src={cert.image} 
                                                        alt={cert.title} 
                                                        loading="lazy" 
                                                        decoding="async" 
                                                        draggable="false" 
                                                    />
                                                    <div className="cert-hover-overlay">
                                                        <button 
                                                            className="cert-expand-btn"
                                                            onClick={() => setSelectedCert(cert)}
                                                        >
                                                            <Maximize2 size={20} />
                                                            <span>View Full</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="cert-premium-meta">
                                                    <span className="cert-premium-issuer">{cert.issuer}</span>
                                                    <h3 className="cert-premium-title">{cert.title}</h3>
                                                </div>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* NEXT BUTTON */}
                        <button className="cert-arrow cert-arrow-right" onClick={goNext} aria-label="Next">
                            <ChevronRight size={22} />
                        </button>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="cert-progress-status">
                        <div className="cert-progress-bar">
                            <motion.div 
                                className="cert-progress-fill"
                                key={currentIndex}
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: (isPaused || isMobileInteracting) ? 0 : 4, ease: 'linear' }}
                            />
                        </div>
                    </div>

                    {/* DOT INDICATORS */}
                    <div className="cert-indicators">
                        {allCertificates.map((_, idx) => (
                            <button 
                                key={idx} 
                                className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
                                onClick={() => goTo(idx)}
                                aria-label={`Go to certificate ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* VIEW MORE BUTTON */}
                    <div className="cert-actions-row">
                        <Link to="/certifications" className="cert-view-more-btn">
                            <span>View All Certificates</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                <CertificationModal 
                    cert={selectedCert} 
                    isOpen={!!selectedCert} 
                    onClose={() => setSelectedCert(null)} 
                />
            </div>
        </section>
    );
};

export default Certifications;
