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
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

    // Mobile state
    const [isMobileInteracting, setIsMobileInteracting] = useState(false);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

    // Drag state for desktop
    const dragStartX = useRef(null);
    const isDragging = useRef(false);

    const goNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex(prev => (prev + 1) % allCertificates.length);
    }, []);

    const goPrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex(prev => (prev - 1 + allCertificates.length) % allCertificates.length);
    }, []);

    const goTo = useCallback((idx) => {
        setDirection(idx > currentIndex ? 1 : -1);
        setCurrentIndex(idx);
    }, [currentIndex]);

    // Auto-slide: desktop
    useEffect(() => {
        if (isPaused || selectedCert) return;
        const interval = setInterval(goNext, 5000);
        return () => clearInterval(interval);
    }, [isPaused, selectedCert, goNext]);

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

    // Mobile auto-scroll
    useEffect(() => {
        if (isMobileInteracting || selectedCert) return;
        const interval = setInterval(() => {
            setMobileActiveIndex(prev => (prev + 1) % allCertificates.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isMobileInteracting, selectedCert]);

    const handleMobileScroll = (e) => {
        if (!e.target._ticking) {
            const el = e.target;
            window.requestAnimationFrame(() => {
                const { scrollLeft, offsetWidth } = el;
                const index = Math.round(scrollLeft / (offsetWidth * 0.85));
                if (index !== mobileActiveIndex) setMobileActiveIndex(index);
                el._ticking = false;
            });
            e.target._ticking = true;
        }
    };

    // Drag handlers for desktop slider
    const handleDragStart = (e) => {
        dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        isDragging.current = true;
    };
    const handleDragEnd = (e) => {
        if (!isDragging.current) return;
        const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const diff = dragStartX.current - endX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goNext() : goPrev();
        }
        isDragging.current = false;
    };

    const cert = allCertificates[currentIndex];

    const slideVariants = {
        enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
    };

    return (
        <section id="certifications" className="about-section certifications-section">
            <div className="container">
                <div className="cert-bg-decoration"></div>

                {/* ═══ DESKTOP PREMIUM SLIDER ═══ */}
                <div className="cert-premium-wrapper desktop-only">

                    <div
                        className="cert-premium-stage"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onMouseDown={handleDragStart}
                        onMouseUp={handleDragEnd}
                        onTouchStart={handleDragStart}
                        onTouchEnd={handleDragEnd}
                    >
                        {/* SOFT SPOTLIGHT */}
                        <div className="cert-spotlight" />

                        {/* PREV BUTTON */}
                        <button className="cert-arrow cert-arrow-left" onClick={goPrev} aria-label="Previous">
                            <ChevronLeft size={22} />
                        </button>

                        {/* CARD */}
                        <div className="cert-card-viewport">
                            <AnimatePresence custom={direction} mode="wait">
                                <motion.div
                                    key={cert.id}
                                    className="cert-premium-card"
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    {/* Floating animation wrapper */}
                                    <motion.div
                                        className="cert-float-wrapper"
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <div className="cert-premium-image-wrap">
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                loading="lazy"
                                                decoding="async"
                                                draggable="false"
                                            />
                                            {/* HOVER OVERLAY */}
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
                                    </motion.div>

                                    {/* CARD META */}
                                    <div className="cert-premium-meta">
                                        <span className="cert-premium-issuer">{cert.issuer}</span>
                                        <h3 className="cert-premium-title">{cert.title}</h3>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* NEXT BUTTON */}
                        <button className="cert-arrow cert-arrow-right" onClick={goNext} aria-label="Next">
                            <ChevronRight size={22} />
                        </button>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="cert-progress-bar">
                        <motion.div
                            className="cert-progress-fill"
                            key={currentIndex}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: isPaused ? 0 : 5, ease: 'linear' }}
                        />
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

                {/* ═══ MOBILE SWIPE CAROUSEL (UNCHANGED) ═══ */}
                <div className="cert-mobile-scroll-container mobile-only">
                    <div
                        className="cert-scroll-track"
                        onScroll={handleMobileScroll}
                        onTouchStart={() => setIsMobileInteracting(true)}
                        onTouchEnd={() => setTimeout(() => setIsMobileInteracting(false), 2000)}
                    >
                        {allCertificates.map((certificate, index) => {
                            const isActive = index === mobileActiveIndex;
                            return (
                                <motion.div
                                    key={`mob-${certificate.id}`}
                                    className="cert-mobile-card"
                                    animate={{ opacity: isActive ? 1 : 0.8, scale: isActive ? 1 : 0.98 }}
                                    transition={{ duration: 0.4 }}
                                    onClick={() => setSelectedCert(certificate)}
                                >
                                    <div className="cert-mobile-image">
                                        <img src={certificate.image} alt={certificate.title} loading="lazy" decoding="async" />
                                        {certificate.issuer && <div className="cert-mobile-tag">{certificate.issuer}</div>}
                                    </div>
                                    <div className="cert-mobile-info">
                                        <h3 className="cert-mobile-title">{certificate.title}</h3>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="cert-mobile-indicators">
                        {allCertificates.map((_, idx) => (
                            <div key={`mi-${idx}`} className={`mi-dot ${idx === mobileActiveIndex ? 'active' : ''}`} />
                        ))}
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
