import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react';
import './CertificationModal.css';

const CertificationModal = ({ cert, isOpen, onClose }) => {
    const [zoom, setZoom] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const imageRef = useRef(null);

    // Reset zoom when cert changes or closes
    useEffect(() => {
        setZoom(1);
        setIsZoomed(false);
    }, [cert, isOpen]);

    if (!isOpen || !cert) return null;

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.5, 3));
        setIsZoomed(true);
    };
    const handleZoomOut = () => {
        const nextZoom = Math.max(zoom - 0.5, 1);
        setZoom(nextZoom);
        if (nextZoom <= 1) setIsZoomed(false);
    };
    const handleReset = () => {
        setZoom(1);
        setIsZoomed(false);
    };

    const toggleClickZoom = () => {
        if (isZoomed) {
            handleReset();
        } else {
            setZoom(2);
            setIsZoomed(true);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="cert-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={onClose}
                >
                    <motion.div 
                        className="cert-modal-container"
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ 
                            type: "spring", 
                            damping: 25, 
                            stiffness: 300 
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* HEADER CONTROLS */}
                        <div className="cert-modal-viewer-header">
                            <div className="cert-viewer-info">
                                <h3>{cert.title}</h3>
                                <p>{cert.issuer} • {cert.date}</p>
                            </div>
                            <div className="cert-viewer-actions">
                                <button onClick={handleZoomOut} title="Zoom Out" disabled={zoom <= 1}><ZoomOut size={20} /></button>
                                <button onClick={handleZoomIn} title="Zoom In" disabled={zoom >= 3}><ZoomIn size={20} /></button>
                                <button onClick={handleReset} title="Reset"><RotateCcw size={20} /></button>
                                <div className="viewer-divider"></div>
                                <button className="close-btn" onClick={onClose} title="Close"><X size={24} /></button>
                            </div>
                        </div>

                        {/* VIEWER AREA */}
                        <div className="cert-viewer-body">
                            <div className="cert-image-viewport">
                                <motion.div 
                                    className="cert-draggable-wrapper"
                                    drag={zoom > 1}
                                    dragConstraints={{ left: -200 * zoom, right: 200 * zoom, top: -200 * zoom, bottom: 200 * zoom }}
                                    animate={{ scale: zoom }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    onClick={toggleClickZoom}
                                    style={{ cursor: zoom > 1 ? 'grab' : 'zoom-in' }}
                                >
                                    <motion.img 
                                        src={cert.image} 
                                        alt={cert.title} 
                                        ref={imageRef}
                                        draggable="false"
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* FOOTER INFO */}
                        <div className="cert-viewer-footer">
                            <div className="cert-skills-tags">
                                {cert.skills.map(skill => (
                                    <span key={skill} className="cert-skill-tag">{skill}</span>
                                ))}
                            </div>
                            <button className="cert-external-link" onClick={() => window.open(cert.image, '_blank')}>
                                <Maximize size={16} />
                                <span>Open in Tab</span>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CertificationModal;
