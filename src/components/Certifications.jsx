import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './About.css';
import CertificationModal from './CertificationModal';

export const allCertificates = [
    { id: 1, image: "/certificates/c1.jpeg" },
    { id: 2, image: "/certificates/c2.jpeg" },
    { id: 3, image: "/certificates/c3.jpeg" },
    { id: 4, image: "/certificates/c4.jpeg" },
    { id: 5, image: "/certificates/c5.jpeg" },
    { id: 6, image: "/certificates/c6.jpeg" },
    { id: 7, image: "/certificates/c7.jpeg" }
];

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);
    const [currentCertIndex, setCurrentCertIndex] = useState(0);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left

    const prevCert = useCallback(() => {
        setDirection(-1);
        setCurrentCertIndex((prev) => (prev === 0 ? allCertificates.length - 1 : prev - 1));
    }, []);

    const nextCert = useCallback(() => {
        setDirection(1);
        setCurrentCertIndex((prev) => (prev + 1) % allCertificates.length);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedCert) return; // Disable when modal is open
            if (e.key === 'ArrowLeft') prevCert();
            if (e.key === 'ArrowRight') nextCert();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [prevCert, nextCert, selectedCert]);

    // Track scroll position to update index for mobile
    const handleMobileScroll = (e) => {
        const { scrollLeft, offsetWidth } = e.target;
        const index = Math.round(scrollLeft / (offsetWidth * 0.85));
        if (index !== mobileActiveIndex) {
            setMobileActiveIndex(index);
        }
    };

    return (
        <section id="certifications" className="about-section certifications-section">
            <div className="container">
                <div className="cert-bg-decoration"></div>
                
                {/* Desktop Premium Slider */}
                <div className="cert-slider-wrapper desktop-only">
                    <div className="cert-slider-container">
                        <button className="cert-nav-btn left" onClick={prevCert} aria-label="Previous Certificate">
                            <ChevronLeft size={28} />
                        </button>
                        
                        <div className="cert-card-premium">
                            <AnimatePresence mode="wait" initial={false} custom={direction}>
                                <motion.div 
                                    key={allCertificates[currentCertIndex].id}
                                    className="cert-image-container-premium"
                                    custom={direction}
                                    initial={{ opacity: 0, x: direction * 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction * -50 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    style={{ willChange: "transform, opacity" }}
                                    onClick={() => setSelectedCert(allCertificates[currentCertIndex])}
                                >
                                    <img 
                                        src={allCertificates[currentCertIndex].image} 
                                        alt={`Certificate ${currentCertIndex + 1}`} 
                                        loading="lazy" 
                                        decoding="async"
                                    />
                                    <div className="cert-overlay">
                                        <div className="cert-view-btn">
                                            <Maximize2 size={24} />
                                            <span>View Full</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button className="cert-nav-btn right" onClick={nextCert} aria-label="Next Certificate">
                            <ChevronRight size={28} />
                        </button>
                    </div>
                    
                    <div className="cert-indicators">
                        {allCertificates.map((_, idx) => (
                            <button 
                                key={idx} 
                                className={`indicator-dot ${idx === currentCertIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setDirection(idx > currentCertIndex ? 1 : -1);
                                    setCurrentCertIndex(idx);
                                }}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile Swipe Carousel with Subtle Previews */}
                <div className="cert-mobile-scroll-container mobile-only">
                    <div 
                        className="cert-scroll-track lag-free-scroll"
                        onScroll={handleMobileScroll}
                    >
                        {allCertificates.map((cert, index) => {
                            const isActive = index === mobileActiveIndex;
                            return (
                                <div 
                                    key={`mob-${cert.id}`} 
                                    className={`cert-mobile-card-premium ${isActive ? 'active' : ''}`}
                                    onClick={() => setSelectedCert(cert)}
                                >
                                    <div className="cert-mobile-image">
                                        <img src={cert.image} alt={`Certificate ${index + 1}`} loading="lazy" decoding="async" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Clean Dot Indicators for Mobile */}
                    <div className="cert-mobile-indicators">
                        {allCertificates.map((_, idx) => (
                            <div 
                                key={`mi-${idx}`} 
                                className={`mi-dot ${idx === mobileActiveIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="cert-view-more-container" style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Link to="/certifications" className="view-details-btn" style={{ display: 'inline-flex', width: 'auto' }}>
                        <span>View All Certifications</span>
                        <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </Link>
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
