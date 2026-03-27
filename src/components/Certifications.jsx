import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './About.css';
import CertificationModal from './CertificationModal';

export const allCertificates = [
    {
        id: 1,
        title: "",
        issuer: "",
        image: "/certificates/c1.jpeg",
        skills: ["Skill 1", "Skill 2"]
    },
    {
        id: 2,
        title: "",
        issuer: "",
        image: "/certificates/c2.jpeg",
        skills: []
    },
    {
        id: 3,
        title: "",
        issuer: "",
        image: "/certificates/c3.jpeg",
        skills: []
    },
    {
        id: 4,
        title: "",
        issuer: "",
        image: "/certificates/c4.jpeg",
        skills: []
    },
    {
        id: 5,
        title: "",
        issuer: "",
        image: "/certificates/c5.jpeg",
        skills: []
    },
    {
        id: 6,
        title: "",
        issuer: "",
        image: "/certificates/c6.jpeg",
        skills: []
    },
    {
        id: 7,
        title: "",
        issuer: "",
        image: "/certificates/c7.jpeg",
        skills: []
    }
];

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);
    const [currentCertIndex, setCurrentCertIndex] = useState(0);
    const [isMobileInteracting, setIsMobileInteracting] = useState(false);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

    const nextCert = () => {
        setCurrentCertIndex((prev) => (prev + 1) % allCertificates.length);
    };

    // Auto-flow for desktop slider
    useEffect(() => {
        const interval = setInterval(() => {
            if (!selectedCert) nextCert();
        }, 5000);
        return () => clearInterval(interval);
    }, [selectedCert]);

    // Auto-flow for mobile swipe
    useEffect(() => {
        if (isMobileInteracting || selectedCert) return;
        
        const interval = setInterval(() => {
            setMobileActiveIndex((prev) => (prev + 1) % allCertificates.length);
        }, 4000);
        
        return () => clearInterval(interval);
    }, [isMobileInteracting, selectedCert]);

    // Track scroll position to update index with throttling
    const handleMobileScroll = (e) => {
        if (!e.target._ticking) {
            const el = e.target;
            window.requestAnimationFrame(() => {
                const { scrollLeft, offsetWidth } = el;
                const index = Math.round(scrollLeft / (offsetWidth * 0.85));
                if (index !== mobileActiveIndex) {
                    setMobileActiveIndex(index);
                }
                el._ticking = false;
            });
            e.target._ticking = true;
        }
    };

    return (
        <section id="certifications" className="about-section certifications-section">
            <div className="container">
                <div className="cert-bg-decoration"></div>
                
                {/* Desktop Slider View */}
                <div className="cert-slider-wrapper desktop-only">
                    <div className="cert-slider-container">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={allCertificates[currentCertIndex].id}
                                className="cert-card active-slide"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 300, 
                                    damping: 30 
                                }}
                                onClick={nextCert}
                            >
                                <div className="cert-image-container">
                                    <img src={allCertificates[currentCertIndex].image} alt={allCertificates[currentCertIndex].title} loading="lazy" decoding="async" />
                                    <div className="cert-overlay">
                                        <div className="cert-view-btn" onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCert(allCertificates[currentCertIndex]);
                                        }}>
                                            <Maximize2 size={24} />
                                            <span>View Certificate</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cert-info">
                                    <div className="cert-meta" style={{ justifyContent: 'center' }}>
                                        {allCertificates[currentCertIndex].issuer && <span className="cert-issuer">{allCertificates[currentCertIndex].issuer}</span>}
                                    </div>
                                    <div className="click-to-next-hint" style={{ marginTop: '10px' }}>Click to see next →</div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    
                    <div className="cert-indicators">
                        {allCertificates.map((_, idx) => (
                            <button 
                                key={idx} 
                                className={`indicator-dot ${idx === currentCertIndex ? 'active' : ''}`}
                                onClick={() => setCurrentCertIndex(idx)}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile Swipe Carousel with Subtle Previews */}
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
                                    className="cert-mobile-card"
                                    animate={{ 
                                        opacity: isActive ? 1 : 0.8,
                                        scale: isActive ? 1 : 0.98
                                    }}
                                    transition={{ duration: 0.4 }}
                                    onClick={() => setSelectedCert(cert)}
                                >
                                    <div className="cert-mobile-image">
                                        <img src={cert.image} alt={cert.title} loading="lazy" decoding="async" />
                                        {cert.issuer && <div className="cert-mobile-tag">{cert.issuer}</div>}
                                    </div>
                                    <div className="cert-mobile-info">
                                        <h3 className="cert-mobile-title">{cert.title}</h3>
                                    </div>
                                </motion.div>
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
