import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProfessionalExperience from './components/ProfessionalExperience';
import WorkGallery from './components/WorkGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import CustomCursor from './components/CustomCursor';
import DesignStoriesPage from './components/DesignStoriesPage';

function PortfolioMain() {
    return (
        <div className="app-container">
            <Navbar />
            <main>
                <Hero />
                <About />
                <ProfessionalExperience />
                <WorkGallery />
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
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
