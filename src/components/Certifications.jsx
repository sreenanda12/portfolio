import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ExternalLink } from 'lucide-react';
import { Link } from 'react-scroll';
import CertificationModal from './CertificationModal';
import './Certifications.css';

// Using the provided data from the local file
export const allCertificates = [
    {
        id: 1,
        title: "Unity Certified Associate: Game Developer",
        issuer: "Unity / ASAP Kerala",
        date: "2023",
        image: "/certificates/c1.jpeg",
        skills: ["Unity", "C#", "Game UI"]
    },
    {
        id: 2,
        title: "Graphic Design Professional",
        issuer: "ICT Academy of Kerala",
        date: "2022",
        image: "/certificates/c2.jpeg",
        skills: ["Photoshop", "Illustrator"]
    },
    {
        id: 3,
        title: "UI/UX Experience Design",
        issuer: "ASAP Kerala",
        date: "2024",
        image: "/certificates/c3.jpeg",
        skills: ["Figma", "Design Thinking"]
    },
    {
        id: 4,
        title: "Meta Social Media Marketing",
        issuer: "Coursera / Meta",
        date: "2023",
        image: "/certificates/c4.jpeg",
        skills: ["Meta Ads", "Campaign Strategy"]
    },
    {
        id: 5,
        title: "Advanced Visual Design",
        issuer: "Interaction Design Foundation",
        date: "2022",
        image: "/certificates/c5.jpeg",
        skills: ["Typography", "Layout"]
    },
    {
        id: 6,
        title: "Digital Illustrator Mastery",
        issuer: "Adobe Certified Expert",
        date: "2022",
        image: "/certificates/c6.jpeg",
        skills: ["Vector Graphics", "Branding"]
    }
];

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    // Track active index on mobile scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!scrollRef.current) return;
            const scrollWidth = scrollRef.current.scrollWidth;
            const scrollLeft = scrollRef.current.scrollLeft;
            const itemWidth = scrollRef.current.children[0].offsetWidth;
            const index = Math.round(scrollLeft / itemWidth);
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        };

        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll, { passive: true });
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, [activeIndex]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.8, 
                ease: [0.2, 0.8, 0.2, 1] 
            } 
        }
    };

    const renderCard = (cert, index) => (
        <motion.div 
            key={cert.id}
            className="cert-card-refined"
            variants={cardVariants}
            onClick={() => setSelectedCert(cert)}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="cert-img-wrapper">
                <img src={cert.image} alt={cert.title} loading="lazy" />
                <div className="cert-card-overlay">
                    <div className="view-cert-icon">
                        <Maximize2 size={24} />
                    </div>
                </div>
            </div>
            
            <div className="cert-content-refined">
                <div className="cert-header-info">
                    <span className="cert-issuer-premium">{cert.issuer}</span>
                    <h3 className="cert-title-premium">{cert.title}</h3>
                </div>
                
                <div className="cert-footer-premium">
                    <span className="cert-date-refined">{cert.date}</span>
                    <div className="cert-skills-preview">
                        {cert.skills.slice(0, 2).map((skill, sIdx) => (
                            <span key={sIdx} className="mini-skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <section id="certifications" className="cert-section-premium">
            <div className="container">
                <motion.div 
                    className="section-title-wrap"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Professional Certifications</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '1rem' }}>
                        Curated collection of industry-recognized certifications in UI/UX, Graphic Design, and Game Development.
                    </p>
                </motion.div>

                {/* DESKTOP GRID */}
                <motion.div 
                    className="cert-grid-desktop"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {allCertificates.map((cert, index) => renderCard(cert, index))}
                </motion.div>

                {/* MOBILE SCROLL */}
                <div className="cert-mobile-scroll" ref={scrollRef}>
                    {allCertificates.map((cert, index) => renderCard(cert, index))}
                </div>

                {/* MOBILE DOTS */}
                <div className="cert-scroll-indicators">
                    {allCertificates.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`cert-dot ${idx === activeIndex ? 'active' : ''}`}
                        />
                    ))}
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
