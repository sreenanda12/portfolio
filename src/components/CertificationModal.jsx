import React, { useState, useEffect } from 'react';
import { Award, X } from 'lucide-react';
import './CertificationModal.css';

const CertificationModal = ({ cert, isOpen, onClose }) => {
    if (!isOpen || !cert) return null;

    return (
        <div className="cert-modal-overlay fadeInOverlay" onClick={onClose}>
            <div className="cert-modal-content fragmentReveal" onClick={e => e.stopPropagation()}>
                <button className="cert-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="cert-modal-header">
                    <div className="cert-modal-logo-wrapper">
                        {cert.imgSrc ? (
                            <img src={cert.imgSrc} alt="Institution Logo" className="cert-modal-logo" />
                        ) : (
                            <Award className="cert-modal-award-icon" size={40} />
                        )}
                    </div>
                    <div className="cert-modal-institution">
                        <h3 className="cert-modal-issuer">{cert.issuer}</h3>
                        <span className="cert-modal-issued-date">{cert.issuedDate}</span>
                    </div>
                </div>

                <div className="cert-modal-body">
                    <h2 className="cert-modal-title">{cert.title}</h2>
                    {cert.credentialId && (
                        <p className="cert-modal-credential">Credential ID: {cert.credentialId}</p>
                    )}

                    <div className="cert-modal-skills-section">
                        <h4>Skills:</h4>
                        <div className="cert-modal-skills-list">
                            {cert.skills.map((skill, index) => (
                                <span key={index} className="cert-modal-skill-tag">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificationModal;
