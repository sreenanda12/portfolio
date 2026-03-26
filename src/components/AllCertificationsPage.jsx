import React, { useEffect, useState } from 'react';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allCertificates } from './Certifications';
import CertificationModal from './CertificationModal';
import './DesignStoriesPage.css'; // Inheriting the same navigation top-header styles
import './AllCertificationsPage.css';

const AllCertificationsPage = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "All Certifications";
    }, []);

    return (
        <div className="design-stories-page">
            <header className="stories-nav-header">
                <div className="container">
                    <Link to="/" className="stories-back-link">
                        <ArrowLeft size={20} />
                        <span>Back to Portfolio</span>
                    </Link>
                </div>
            </header>

            <main className="certifications-page-main">
                <div className="container">
                    <div className="stories-header">
                        <h1 className="stories-title">Professional <span>Certifications</span></h1>
                        <p className="stories-subtitle">A detailed overview of my verified skills and achievements.</p>
                    </div>

                    <div className="cert-page-grid">
                        {allCertificates.map(cert => (
                            <div key={cert.id} className="cert-page-card" onClick={() => setSelectedCert(cert)}>
                                <div className="cert-image-container">
                                    <img src={cert.image} alt={cert.title} />
                                    <div className="cert-overlay">
                                        <div className="cert-view-btn">
                                            <Maximize2 size={24} />
                                            <span>View</span>
                                        </div>
                                    </div>
                                </div>
                                {cert.title && (
                                    <div className="cert-info">
                                        <h3 className="cert-title">{cert.title}</h3>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <CertificationModal 
                cert={selectedCert} 
                isOpen={!!selectedCert} 
                onClose={() => setSelectedCert(null)} 
            />
        </div>
    );
};

export default AllCertificationsPage;
