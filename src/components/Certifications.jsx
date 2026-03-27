import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const [isMobileInteracting, setIsMobileInteracting] = useState(false);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextCert = useCallback(() => {
        setDirection(1);
        setCurrentCertIndex((prev) => (prev + 1) % allCertificates.length);
    }, []);

    const prevCert = useCallback(() => {
        setDirection(-1);
        setCurrentCertIndex((prev) => (prev - 1 + allCertificates.length) % allCertificates.length);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedCert) return; // Disable when modal is open
            if (e.key === 'ArrowRight') nextCert();
            if (e.key === 'ArrowLeft') prevCert();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextCert, prevCert, selectedCert]);

    // Auto-flow for desktop slider
    useEffect(() => {
        const interval = setInterval(() => {
            if (!selectedCert) nextCert();
        }, 6000);
        return () => clearInterval(interval);
    }, [selectedCert, nextCert]);

    // Auto-flow for mobile swipe
    useEffect(() => {
        if (isMobileInteracting || selectedCert) return;
        const interval = setInterval(() => {
            setMobileActiveIndex((prev) => (prev + 1) % allCertificates.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isMobileInteracting, selectedCert]);

    const handleMobileScroll = (e) => {
        const { scrollLeft, offsetWidth } = e.target;
        const index = Math.round(scrollLeft / (offsetWidth * 0.85));
        if (index !== mobileActiveIndex) {
            setMobileActiveIndex(index);
        }
    };

    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            z: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
        },
        exit: (dir) => ({
            z: 0,
            x: dir < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
        })
    };

    return (
        <section id="certifications" className="about-section certifications-section">
            <div className="container">
                <div className="cert-bg-decoration"></div>
                
                {/* Desktop Premium Slider View */}
                <div className="cert-premium-slider-wrapper desktop-only">
                    <button className="cert-nav-arrow left" onClick={prevCert} aria-label="Previous certificate">
                        <ChevronLeft size={32} />
                    </button>

                    <div className="cert-premium-container">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div 
                                key={currentCertIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="cert-premium-card"
                                onClick={() => setSelectedCert(allCertificates[currentCertIndex])}
                            >
                                <div className="cert-premium-image">
                                    <img 
                                        src={allCertificates[currentCertIndex].image} 
                                        alt="Certificate" 
                                        loading="lazy" 
                                    />
                                    <div className="cert-overlay">
                                        <div className="cert-view-btn">
                                            <Maximize2 size={24} />
                                            <span>View Certificate</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button className="cert-nav-arrow right" onClick={nextCert} aria-label="Next certificate">
                        <ChevronRight size={32} />
                    </button>
                    
                    <div className="cert-indicators" style={{ position: 'absolute', bottom: '-40px', left: '0', right: '0' }}>
                        {allCertificates.map((_, idx) => (
                            <button 
                                key={idx} 
                                className={`indicator-dot ${idx === currentCertIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setDirection(idx > currentCertIndex ? 1 : -1);
                                    setCurrentCertIndex(idx);
                                }}
                                aria-label={`Go to certificate ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile Swipe Carousel */}
                <div className="cert-mobile-scroll-container mobile-only">
                    <div 
                        className="cert-scroll-track"
                        onScroll={handleMobileScroll}
                        onTouchStart={() => setIsMobileInteracting(true)}
                        onTouchEnd={() => setTimeout(() => setIsMobileInteracting(false), 2000)}
                    >
                        {allCertificates.map((cert, index) => {
                            const isActive = index === mobileActiveIndex;
                            return (
                                <motion.div 
                                    key={`mob-${cert.id}`} 
                                    className="cert-mobile-card-pure"
                                    animate={{ 
                                        opacity: isActive ? 1 : 0.5,
                                        scale: isActive ? 1 : 0.95
                                    }}
                                    transition={{ duration: 0.4 }}
                                    onClick={() => setSelectedCert(cert)}
                                >
                                    <div className="cert-mobile-image-pure">
                                        <img src={cert.image} alt="Certificate" loading="lazy" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                    
                    <div className="cert-mobile-indicators">
                        {allCertificates.map((_, idx) => (
                            <div 
                                key={`mi-${idx}`} 
                                className={`mi-dot ${idx === mobileActiveIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="cert-view-more-container" style={{ marginTop: '4rem', textAlign: 'center' }}>
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
