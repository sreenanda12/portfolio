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
        issuer: "Professional Certification",
        date: "2024",
        image: "/certificates/c1.jpeg",
        skills: ["Skill 1", "Skill 2"]
    },
    {
        id: 2,
        title: "",
        issuer: "Professional Certification",
        date: "2024",
        image: "/certificates/c2.jpeg",
        skills: []
    },
    {
        id: 3,
        title: "",
        issuer: "Professional Certification",
        date: "2023",
        image: "/certificates/c3.jpeg",
        skills: []
    },
    {
        id: 4,
        title: "",
        issuer: "Professional Certification",
        date: "2023",
        image: "/certificates/c4.jpeg",
        skills: []
    },
    {
        id: 5,
        title: "",
        issuer: "Professional Certification",
        date: "2022",
        image: "/certificates/c5.jpeg",
        skills: []
    },
    {
        id: 6,
        title: "",
        issuer: "Professional Certification",
        date: "2022",
        image: "/certificates/c6.jpeg",
        skills: []
    },
    {
        id: 7,
        title: "",
        issuer: "Professional Certification",
        date: "2021",
        image: "/certificates/c7.jpeg",
        skills: []
    }
];

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);
    const [currentCertIndex, setCurrentCertIndex] = useState(0);

    const nextCert = () => {
        setCurrentCertIndex((prev) => (prev + 1) % allCertificates.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextCert();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="certifications" className="about-section certifications-section">
            <div className="container">
                <div className="cert-bg-decoration"></div>
                
                <div className="cert-slider-wrapper">
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
                                    <img src={allCertificates[currentCertIndex].image} alt={allCertificates[currentCertIndex].title} />
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
                                    <div className="cert-meta">
                                        <span className="cert-issuer">{allCertificates[currentCertIndex].issuer}</span>
                                        <span className="cert-date">{allCertificates[currentCertIndex].date}</span>
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
