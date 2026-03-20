import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorkGallery from './WorkGallery';
import './DesignStoriesPage.css';

const DesignStoriesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Design Stories";
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

            <WorkGallery fullView={true} title="design stories" />
        </div>
    );
};

export default DesignStoriesPage;
