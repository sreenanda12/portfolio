import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WorkGallery from './components/WorkGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import CursorSparkles from './components/CursorSparkles';
import DesignStoriesPage from './components/DesignStoriesPage';

function PortfolioMain() {
    return (
        <div className="app-container">
            <Navbar />
            <main>
                <Hero />
                <About />
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
            <CursorSparkles />
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
