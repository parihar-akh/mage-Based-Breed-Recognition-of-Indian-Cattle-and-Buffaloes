import React from 'react';
import { Download, FileText, CheckCircle2, Award, ExternalLink } from 'lucide-react';
import { generateAndDownloadProjectZip } from '../utils/zipGenerator';

interface FooterProps {
  setActivePage: (page: string) => void;
  onOpenDocModal: (docId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenDocModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Project Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                PV
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                PashuVision AI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Image-Based Breed Recognition System for Indian Cattle and Buffaloes Using Deep Learning. An academic major project engineered with a hierarchical two-stage MobileNetV2 architecture in compliance with ICAR-NBAGR descriptive breed standards.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              Department of Computer Science & Engineering · Artificial Intelligence & Computer Vision Major Project
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('recognition'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Live Breed Classifier
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('library'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  8 Verified Breeds Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  System Architecture & Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('research'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Research & Evaluation Metrics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Submission Deliverables */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              College Deliverables
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onOpenDocModal('paper')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-emerald-500" />
                  <span>Research Paper Draft</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocModal('report')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-emerald-500" />
                  <span>Project Report Blueprint</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocModal('slides')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-emerald-500" />
                  <span>12-Slide Viva Presentation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocModal('viva')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Award className="w-3 h-3 text-emerald-500" />
                  <span>25 Viva Questions & Answers</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocModal('checklist')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>Evaluation Testing Checklist</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Academic Major Project. Grounded in ICAR-NBAGR standards.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => generateAndDownloadProjectZip()}
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Project Package (.zip)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
