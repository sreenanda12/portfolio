import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SummaryStrip from './components/SummaryStrip';
import WhoIAm from './components/WhoIAm';
import SkillsAndTools from './components/SkillsAndTools';
import Education from './components/Education';
import ProfessionalExperience from './components/ProfessionalExperience';
import WorkGallery from './components/WorkGallery';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import CustomCursor from './components/CustomCursor';
import DesignStoriesPage from './components/DesignStoriesPage';
import ProjectDetailsPage from './components/ProjectDetailsPage';
import SectionHeader from './components/SectionHeader';
import AllCertificationsPage from './components/AllCertificationsPage';
import CertificateViewerPage from './components/CertificateViewerPage';

function PortfolioMain() {
    return (
        <div className="app-container">
            <Navbar />
            <main>
                <Hero />
                <SummaryStrip />
                
                <WorkGallery />

                <SectionHeader title="Who I Am" id="who-i-am" />
                <WhoIAm />

                <SectionHeader title="Skills & Tools" id="skills-and-tools" highlight="Tools" />
                <SkillsAndTools />

                <SectionHeader title="Education" id="education" />
                <Education />

                <SectionHeader title="Professional Experience" id="experience" highlight="Experience" />
                <ProfessionalExperience />

                <SectionHeader title="Certifications" id="certifications" highlight="Certifications" />
                <Certifications />

                <Contact />
            </main>
            <Footer />
            <FloatingButtons />
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <CustomCursor />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<PortfolioMain />} />
                    <Route path="/design-stories" element={<DesignStoriesPage />} />
                    <Route path="/project/:id" element={<ProjectDetailsPage />} />
                    <Route path="/certifications" element={<AllCertificationsPage />} />
                    <Route path="/certificate-view/:id" element={<CertificateViewerPage />} />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
