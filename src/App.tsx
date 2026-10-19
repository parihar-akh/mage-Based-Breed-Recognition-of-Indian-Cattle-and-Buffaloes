import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RecognitionPage } from './pages/RecognitionPage';
import { LibraryPage } from './pages/LibraryPage';
import { AboutPage } from './pages/AboutPage';
import { ResearchPage } from './pages/ResearchPage';
import { AcademicDocModal } from './components/AcademicDocModal';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [docModalOpen, setDocModalOpen] = useState<boolean>(false);
  const [selectedDocId, setSelectedDocId] = useState<string>('paper');

  const handleOpenDocModal = (docId: string) => {
    setSelectedDocId(docId);
    setDocModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-700 selection:text-white">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenDocModal={handleOpenDocModal}
      />

      {/* Main Page Stage */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onOpenDocModal={handleOpenDocModal}
          />
        )}
        {activePage === 'recognition' && (
          <RecognitionPage
            setActivePage={setActivePage}
            onOpenDocModal={handleOpenDocModal}
          />
        )}
        {activePage === 'library' && (
          <LibraryPage
            setActivePage={setActivePage}
            onOpenDocModal={handleOpenDocModal}
          />
        )}
        {activePage === 'about' && (
          <AboutPage
            setActivePage={setActivePage}
            onOpenDocModal={handleOpenDocModal}
          />
        )}
        {activePage === 'research' && (
          <ResearchPage
            onOpenDocModal={handleOpenDocModal}
          />
        )}
      </main>

      {/* Academic Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenDocModal={handleOpenDocModal}
      />

      {/* Academic Document Reader Modal */}
      <AcademicDocModal
        isOpen={docModalOpen}
        initialDocId={selectedDocId}
        onClose={() => setDocModalOpen(false)}
      />
    </div>
  );
}
