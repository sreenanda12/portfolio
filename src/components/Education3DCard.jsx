import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import './Education3DCard.css';

const Education3DCard = ({ edu }) => {
    const [modalData, setModalData] = useState({ isOpen: false, rect: null });
    const cardRef = useRef(null);

    const openModal = () => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setModalData({ isOpen: true, rect });
        }
    };

    const closeModal = () => {
        setModalData({ isOpen: false, rect: null });
    };

    return (
        <div className="timeline-item">
            <div className="timeline-dot"></div>

            {/* The Main Hoverable Card */}
            <div
                className={`timeline-content edu-card-3d ${modalData.isOpen ? 'hidden-card' : ''}`}
                ref={cardRef}
                onClick={openModal}
            >
                <h4>{edu.title}</h4>
            </div>

            {/* The Shatter Modal Overlay */}
            {modalData.isOpen && (
                <div className="edu-modal-overlay" onClick={closeModal}>

                    {/* The 4 Shatter Panels starting from the card's original position */}
                    <ShatterPanels rect={modalData.rect} cardTitle={edu.title} />

                    {/* The Expanding Detail View */}
                    <div className="edu-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="edu-modal-close" onClick={closeModal}><X size={24} /></button>
                        <h2 className="edu-modal-title">{edu.title}</h2>

                        <div className="edu-modal-info">
                            {edu.institution && (
                                <p className="edu-modal-inst"><strong>Institution:</strong> {edu.institution}</p>
                            )}
                            {edu.date && (
                                <p className="edu-modal-date"><strong>Date:</strong> {edu.date}</p>
                            )}
                            {edu.grade && (
                                <p className="edu-modal-grade"><strong>Grade:</strong> {edu.grade}</p>
                            )}

                            {edu.skills && edu.skills.length > 0 && (
                                <div className="edu-modal-skills-section">
                                    <h4>Skills:</h4>
                                    <div className="cert-modal-skills-list">
                                        {edu.skills.map((s, i) => (
                                            <span key={i} className="cert-modal-skill-tag">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {edu.activities && (
                                <div className="edu-modal-activities">
                                    <h4>Activities and societies:</h4>
                                    <p>{edu.activities}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ShatterPanels = ({ rect, cardTitle }) => {
    if (!rect) return null;

    // Position a container exactly where the card was relative to viewport
    const containerStyle = {
        position: 'absolute',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
    };

    return (
        <div className="shatter-panel-container" style={containerStyle}>
            <div className="shatter-panel panel-tl" />
            <div className="shatter-panel panel-tr" />
            <div className="shatter-panel panel-bl" />
            <div className="shatter-panel panel-br" />
        </div>
    );
};

export default Education3DCard;
