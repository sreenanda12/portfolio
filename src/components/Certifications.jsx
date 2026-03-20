import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import './About.css';
import CertificationModal from './CertificationModal';

const certificationsData = [
    {
        id: 1,
        title: "Unity Certified Associate: Game Developer",
        issuer: "Unity / ASAP Kerala",
        date: "2023",
        image: "https://placehold.co/800x600/f3f4f6/2f2f2f?text=Unity+Certificate",
        skills: ["Unity", "C#", "Game UI"]
    },
    {
        id: 2,
        title: "Graphic Design Certification",
        issuer: "ICT Academy of Kerala",
        date: "2022",
        image: "https://placehold.co/800x600/f3f4f6/2f2f2f?text=Graphic+Design+Certificate",
        skills: ["Photoshop", "Illustrator", "Branding"]
    },
    {
        id: 3,
        title: "UI/UX Experience Design",
        issuer: "ASAP Kerala",
        date: "2024",
        image: "https://placehold.co/800x600/f3f4f6/2f2f2f?text=UI/UX+Certificate",
        skills: ["Figma", "User Research", "Prototyping"]
    },
    {
        id: 4,
        title: "Visual Design Professional",
        issuer: "Course Completion",
        date: "2021",
        image: "https://placehold.co/800x600/f3f4f6/2f2f2f?text=Visual+Design+Certificate",
        skills: ["Composition", "Typography", "Color Theory"]
    }
];

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);
    const [currentCertIndex, setCurrentCertIndex] = useState(0);

    const nextCert = () => {
        setCurrentCertIndex((prev) => (prev + 1) % certificationsData.length);
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
                                key={certificationsData[currentCertIndex].id}
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
                                    <img src={certificationsData[currentCertIndex].image} alt={certificationsData[currentCertIndex].title} />
                                    <div className="cert-overlay">
                                        <div className="cert-view-btn" onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCert(certificationsData[currentCertIndex]);
                                        }}>
                                            <Maximize2 size={24} />
                                            <span>View Certificate</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cert-info">
                                    <div className="cert-meta">
                                        <span className="cert-issuer">{certificationsData[currentCertIndex].issuer}</span>
                                        <span className="cert-date">{certificationsData[currentCertIndex].date}</span>
                                    </div>
                                    <h3 className="cert-title">{certificationsData[currentCertIndex].title}</h3>
                                    <div className="click-to-next-hint">Click to see next →</div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    
                    <div className="cert-indicators">
                        {certificationsData.map((_, idx) => (
                            <button 
                                key={idx} 
                                className={`indicator-dot ${idx === currentCertIndex ? 'active' : ''}`}
                                onClick={() => setCurrentCertIndex(idx)}
                            />
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
