import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from './WorkGallery';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';

const WorkViewerPage = ({ customUrl, customTitle }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    let project = null;
    let contentUrl = null;
    let title = "";

    if (customUrl) {
        contentUrl = customUrl;
        title = customTitle || "Viewer";
        project = { title: title, pdf: customUrl.endsWith('.pdf') ? customUrl : null };
    } else {
        project = projects.find(p => p.id === parseInt(id));
        contentUrl = project ? (project.url || project.pdf) : null;
        title = project ? project.title : "";
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (title) {
            document.title = `${title} | Viewer`;
        }
    }, [title]);

    if (!project || !contentUrl) {
        return (
            <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>Work not found</h2>
                <Link to="/" style={{ color: 'var(--accent-primary)', marginTop: '20px' }}>Back to Portfolio</Link>
            </div>
        );
    }

    return (
        <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-primary)' }}>
            <header style={{ 
                padding: '12px 24px', 
                background: 'var(--bg-secondary)', 
                borderBottom: '1px solid var(--border-light)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                zIndex: 100 
            }}>
                <button 
                    onClick={() => navigate('/')} 
                    style={{ 
                        background: 'var(--accent-primary)', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 16px', 
                        borderRadius: '20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                    }}
                >
                    <ArrowLeft size={18} />
                    <span>Back to Portfolio</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Project</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{project.title}</span>
                    </div>
                    {project.pdf && (
                        <a 
                            href={project.pdf} 
                            download 
                            style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
                        >
                            <Download size={18} />
                            <span className="hide-mobile">Download</span>
                        </a>
                    )}
                    <a 
                        href={contentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
                    >
                        <ExternalLink size={18} />
                        <span className="hide-mobile">Open Direct</span>
                    </a>
                </div>
            </header>
            
            <div style={{ flex: 1, position: 'relative', background: '#1a1a1a' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', color: '#fff' }}>
                    <div>
                        <p>Loading content...</p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>If the project doesn't load, it may be blocked from being viewed in a frame.</p>
                        <a href={contentUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Click here to open in a new tab</a>
                    </div>
                </div>
                <iframe 
                    src={contentUrl} 
                    title={project.title}
                    style={{ width: '100%', height: '100%', border: 'none', position: 'relative', zIndex: 2 }}
                    allowFullScreen
                />
            </div>

            <style>{`
                @media (max-width: 600px) {
                    .hide-mobile { display: none; }
                }
            `}</style>
        </div>
    );
};

export default WorkViewerPage;
