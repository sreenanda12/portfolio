import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { allCertificates } from './Certifications';

const CertificateViewerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const cert = allCertificates.find(c => c.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "View Certificate";
    }, []);

    if (!cert) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>Certificate not found</h2>
                <Link to="/" style={{ marginLeft: '20px', color: 'var(--accent-primary)' }}>Go Back</Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            <header style={{ padding: '20px 40px', background: 'var(--nav-bg)', backdropFilter: 'var(--nav-blur)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
                {/* Custom back action rather than fixed link, acts as a true back button */}
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
                >
                    <ArrowLeft size={20} />
                    <span>Back to Page</span>
                </button>
            </header>
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
                <img 
                    src={cert.image} 
                    alt="Certificate Full View" 
                    style={{ 
                        maxWidth: '100%', 
                        maxHeight: '85vh', 
                        objectFit: 'contain', 
                        borderRadius: '12px', 
                        boxShadow: 'var(--shadow-hover)' 
                    }} 
                />
            </main>
        </div>
    );
};

export default CertificateViewerPage;
