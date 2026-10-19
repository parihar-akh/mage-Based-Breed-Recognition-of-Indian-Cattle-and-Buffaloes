import React from 'react';
import { Layers, Cpu, ShieldCheck, Database, GitBranch, ArrowRight, BookOpen, Download, Server, Smartphone, CheckCircle2 } from 'lucide-react';
import { generateAndDownloadProjectZip } from '../utils/zipGenerator';

interface AboutPageProps {
  onOpenDocModal: (docId: string) => void;
  setActivePage: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenDocModal, setActivePage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>System Architecture & Methodology</span>
              <span aria-hidden="true">·</span>
              <span>Final Year Major Project</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-1">
              About the Major Project
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDocModal('report')}
              className="text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Report Structure
            </button>
            <button
              onClick={() => generateAndDownloadProjectZip()}
              className="text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP</span>
            </button>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Title: <strong>Image-Based Breed Recognition System for Indian Cattle and Buffaloes Using Deep Learning</strong>. An engineering investigation into fine-grained transfer learning, out-of-scope rejection, and agricultural edge deployment.
        </p>
      </div>

      {/* 1. Problem Statement & Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Statement */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
            01. Problem Statement
          </span>
          <h3 className="text-lg font-bold text-slate-950">
            The Critical Need for Indigenous Livestock Verification
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            India boasts the world&apos;s largest livestock inventory, yet centuries-old indigenous breeds (such as Gir, Sahiwal, and Murrah) are suffering genetic erosion due to decades of unplanned, indiscriminate crossbreeding.
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 pt-1">
            <li><strong>Veterinary Shortage:</strong> Field livestock officers cannot physically evaluate every rural herd.</li>
            <li><strong>High Genotyping Costs:</strong> DNA microsatellite sequencing costs &gt; ₹2,500 per animal and takes 2-3 weeks.</li>
            <li><strong>Ear-Tag Loss:</strong> Physical RFID or plastic ear-tags are frequently lost, torn, or fraudulently swapped during insurance claim settlements.</li>
          </ul>
        </div>

        {/* Objectives */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            02. Project Objectives
          </span>
          <h3 className="text-lg font-bold text-slate-950">
            Engineered Technical Milestones
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Design, implement, evaluate, and package a production-grade computer vision pipeline strictly scoped to Indian cattle and buffaloes:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 pt-1">
            <li><strong>Non-Invasive Vision Pipeline:</strong> Image-based identification with zero stress to the livestock.</li>
            <li><strong>Hierarchical Decoupling:</strong> Implement a two-stage neural pipeline separating species discrimination from fine-grained breed categorization.</li>
            <li><strong>Out-of-Scope Rejection Safeguard:</strong> Rejection threshold ($\tau = 0.65$) that never forces false predictions on dogs, cats, or random items.</li>
            <li><strong>Edge Mobile Readiness:</strong> MobileNetV2 architecture with &lt;65ms inference speed on standard edge CPUs.</li>
          </ul>
        </div>
      </div>

      {/* 2. SYSTEM ARCHITECTURE DIAGRAM (Visual Interactive Component) */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Pipeline Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mt-0.5">
            Two-Stage Deep Transfer Learning Pipeline
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Visual dataflow representation from raw camera capture to calibrated breed diagnostic dossier.
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="bg-slate-950 text-white p-6 rounded-xl overflow-x-auto space-y-6 border border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 min-w-[720px]">
            {/* Node 1: Input */}
            <div className="flex-1 bg-slate-900 border border-slate-700 p-4 rounded-lg text-center space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Input Node</span>
              <h4 className="text-xs font-bold text-white">Animal Photograph</h4>
              <p className="text-[11px] text-slate-400">JPG, PNG, WEBP · Mobile / Field Camera</p>
            </div>

            <div className="text-slate-500 font-mono text-xs">→</div>

            {/* Node 2: Preprocessing */}
            <div className="flex-1 bg-slate-900 border border-slate-700 p-4 rounded-lg text-center space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Preprocessing</span>
              <h4 className="text-xs font-bold text-white">Tensor Normalization</h4>
              <p className="text-[11px] text-slate-400">224×224×3 RGB · MD5 Hash Check</p>
            </div>

            <div className="text-slate-500 font-mono text-xs">→</div>

            {/* Node 3: Stage 1 Species Classifier */}
            <div className="flex-1 bg-emerald-950 border border-emerald-600/60 p-4 rounded-lg text-center space-y-1">
              <span className="text-[10px] font-mono text-emerald-300 uppercase">Stage 1 Classifier</span>
              <h4 className="text-xs font-bold text-white">Species Gating</h4>
              <p className="text-[11px] text-emerald-200">MobileNetV2 · Cow vs Buffalo vs Reject</p>
            </div>
          </div>

          {/* Gating Split Branch */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-[720px] pt-4 border-t border-slate-800">
            {/* Cow Branch */}
            <div className="bg-slate-900 border border-emerald-800 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Stage 2A: Cattle</span>
                <span className="text-[10px] text-slate-400 font-mono">p &ge; 0.65</span>
              </div>
              <h4 className="text-xs font-bold text-white">Cattle Breed Classifier</h4>
              <p className="text-[11px] text-slate-400">
                Fine-tuned MobileNetV2 (top 30 layers) evaluating:
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-slate-950 p-2 rounded">
                Gir · Sahiwal · Tharparkar · Red Sindhi
              </div>
            </div>

            {/* Buffalo Branch */}
            <div className="bg-slate-900 border border-emerald-800 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Stage 2B: Buffalo</span>
                <span className="text-[10px] text-slate-400 font-mono">p &ge; 0.65</span>
              </div>
              <h4 className="text-xs font-bold text-white">Buffalo Breed Classifier</h4>
              <p className="text-[11px] text-slate-400">
                Fine-tuned MobileNetV2 (top 35 layers) evaluating:
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-slate-950 p-2 rounded">
                Murrah · Jaffarabadi · Nili-Ravi · Mehsana
              </div>
            </div>

            {/* Rejection Branch */}
            <div className="bg-slate-900 border border-rose-900/60 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-rose-400 uppercase font-semibold">Out-of-Scope Safeguard</span>
                <span className="text-[10px] text-rose-400 font-mono">p &lt; 0.65</span>
              </div>
              <h4 className="text-xs font-bold text-rose-200">Rejection Engine</h4>
              <p className="text-[11px] text-slate-400">
                Activates when non-livestock (dogs, cats) or blurry photos are detected:
              </p>
              <div className="text-[11px] text-rose-300 bg-slate-950 p-2 rounded">
                &quot;Unable to identify reliably. Please upload clearer image.&quot;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Technologies Used */}
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Engineering Foundation
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
          Technologies & Software Stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Core AI Backbone</span>
            <h4 className="text-sm font-bold text-slate-900">MobileNetV2 Transfer Learning</h4>
            <p className="text-xs text-slate-600">Depthwise separable convolutions with inverted residuals (3.4M params).</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Deep Learning Framework</span>
            <h4 className="text-sm font-bold text-slate-900">TensorFlow / PyTorch</h4>
            <p className="text-xs text-slate-600">Categorical Cross-Entropy, Adam optimizer, Early Stopping, ReduceLROnPlateau.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Backend & Inference</span>
            <h4 className="text-sm font-bold text-slate-900">FastAPI & Express</h4>
            <p className="text-xs text-slate-600">RESTful model serving with multipart uploads and sub-70ms response time.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">User Interface</span>
            <h4 className="text-sm font-bold text-slate-900">React 19 & Tailwind CSS v4</h4>
            <p className="text-xs text-slate-600">Responsive desktop and mobile design conforming to anti-slop guidelines.</p>
          </div>
        </div>
      </div>

      {/* 4. Real-World Applications */}
      <div className="p-6 sm:p-8 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Agricultural Impact
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
          Field Applications in Indian Livestock Sector
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-slate-900">
              1. Rashtriya Gokul Mission
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides field extension workers with an objective verification tool to certify purebred cattle and buffaloes before disbursing state breeding subsidies.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-slate-900">
              2. Livestock Insurance Settlement
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminates fraudulent claims arising from missing ear-tags by matching phenotypic breed characteristics and biometric traits at time of underwriting and death claim.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-slate-900">
              3. Cattle Fairs (Pashu Melas)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assists farmers and buyers in determining genuine breed purity during rural livestock sales, preventing exploitation by unscrupulous traders.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Project Team & Guide Credits Card */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Academic Attribution
          </span>
          <h3 className="text-base font-bold text-slate-950">
            College Major Project Final Year Submission
          </h3>
          <p className="text-xs text-slate-500">
            Department of Computer Science & Engineering · Artificial Intelligence & Machine Learning Track
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenDocModal('slides')}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Presentation Slides
          </button>
          <button
            onClick={() => onOpenDocModal('viva')}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
          >
            Viva Defense Q&A
          </button>
        </div>
      </div>
    </div>
  );
};
