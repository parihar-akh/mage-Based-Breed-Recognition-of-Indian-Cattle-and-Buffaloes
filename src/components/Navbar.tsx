import React, { useState } from 'react';
import { Download, Menu, X, Sparkles, BookOpen } from 'lucide-react';
import { generateAndDownloadProjectZip } from '../utils/zipGenerator';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenDocModal: (docId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, onOpenDocModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState('');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'recognition', label: 'Breed Recognition' },
    { id: 'library', label: 'Breed Library' },
    { id: 'about', label: 'About Project' },
    { id: 'research', label: 'Research & Metrics' }
  ];

  const handleDownloadZip = async () => {
    try {
      setDownloadingZip(true);
      await generateAndDownloadProjectZip((percent, status) => {
        setDownloadProgress(`${percent}% - ${status}`);
      });
    } catch (err) {
      console.error('ZIP generation error:', err);
    } finally {
      setTimeout(() => {
        setDownloadingZip(false);
        setDownloadProgress('');
      }, 1200);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark (Single element) */}
          <button
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-base tracking-tighter">
              PV
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
              PashuVision <span className="text-emerald-800 font-semibold text-sm">AI</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
                  activePage === item.id
                    ? 'border-emerald-800 text-emerald-950 font-semibold'
                    : 'border-transparent hover:text-slate-950 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenDocModal('paper')}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              title="View Research Paper Draft"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Research Paper</span>
            </button>

            <button
              onClick={handleDownloadZip}
              disabled={downloadingZip}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
              title="Download Complete Python ML and Documentation ZIP Package"
            >
              <Download className={`w-3.5 h-3.5 ${downloadingZip ? 'animate-bounce' : ''}`} />
              <span>{downloadingZip ? downloadProgress || 'Creating ZIP...' : 'Download Project ZIP'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                  activePage === item.id
                    ? 'bg-emerald-50 text-emerald-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDocModal('viva');
              }}
              className="w-full text-center px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg"
            >
              Viva Questions & Answers
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownloadZip();
              }}
              disabled={downloadingZip}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 rounded-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingZip ? downloadProgress || 'Generating...' : 'Download Project ZIP'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
