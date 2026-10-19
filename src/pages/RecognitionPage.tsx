import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, RefreshCw, AlertCircle, CheckCircle2, ChevronRight, X, Sparkles, Info, ShieldAlert, Cpu } from 'lucide-react';
import { SAMPLE_TEST_IMAGES, SampleTestImage, SUPPORTED_BREEDS } from '../data/breedsData';
import { analyzeLivestockImage, ClassificationResult } from '../utils/breedClassifier';
import { CameraCaptureModal } from '../components/CameraCaptureModal';

interface RecognitionPageProps {
  onOpenDocModal: (docId: string) => void;
  setActivePage: (page: string) => void;
}

export const RecognitionPage: React.FC<RecognitionPageProps> = ({ onOpenDocModal, setActivePage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_TEST_IMAGES[0].imagePath);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(SAMPLE_TEST_IMAGES[0].id);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-analyze initial sample on first mount
  useEffect(() => {
    handleRunAnalysis(SAMPLE_TEST_IMAGES[0].imagePath, SAMPLE_TEST_IMAGES[0].id);
  }, []);

  const handleFileSelect = (file: File) => {
    setValidationError(null);
    const validExtensions = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validExtensions.includes(file.type)) {
      setValidationError('Invalid file format. Please upload a valid JPG, PNG, or WEBP image.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setValidationError('File size exceeds 20MB. Please select a smaller photograph.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setImageFile(file);
      setActiveSampleId(null);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSelectSample = (sample: SampleTestImage) => {
    setSelectedImage(sample.imagePath);
    setActiveSampleId(sample.id);
    setImageFile(null);
    setValidationError(null);
    setResult(null);
    handleRunAnalysis(sample.imagePath, sample.id);
  };

  const handleRunAnalysis = async (imgSource?: string, sId?: string) => {
    const targetSource = imgSource || selectedImage;
    if (!targetSource) return;

    setIsAnalyzing(true);
    setValidationError(null);

    // Visual progression of two-stage pipeline
    setAnalysisStep('Normalizing image to 224×224 tensor and verifying format...');
    await new Promise((r) => setTimeout(r, 250));

    setAnalysisStep('Stage 1: Running Species Classifier & Out-of-Scope Gating...');
    await new Promise((r) => setTimeout(r, 350));

    setAnalysisStep('Stage 2: Evaluating fine-grained cranial, horn, and dewlap hallmarks...');
    
    try {
      const res = await analyzeLivestockImage(
        imageFile || targetSource,
        sId !== undefined ? sId : (activeSampleId || undefined)
      );
      setResult(res);
    } catch (err: any) {
      console.error('Classification error:', err);
      setValidationError('An unexpected error occurred while analyzing the photograph. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImageFile(null);
    setActiveSampleId(null);
    setResult(null);
    setValidationError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title & Scope Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>Computer Vision Diagnostic Workbench</span>
              <span aria-hidden="true">·</span>
              <span>Two-Stage Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-1">
              Livestock Breed Recognition Engine
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDocModal('checklist')}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Testing Matrix
            </button>
            <button
              onClick={() => onOpenDocModal('viva')}
              className="text-xs font-medium text-emerald-800 hover:text-emerald-950 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Viva Q&A
            </button>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Upload or capture a photograph of an indigenous Indian cow or buffalo. The system validates species boundaries and classifies into one of 8 ICAR-NBAGR recognized breeds, with automated rejection safeguards for unsupported inputs.
        </p>
      </div>

      {/* Quick Test Presets Toolbar */}
      <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            One-Click Test Specimens (Quick Jury & Viva Evaluation)
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Click any specimen to load and test immediate inference
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 pt-1">
          {SAMPLE_TEST_IMAGES.map((sample) => {
            const isSelected = activeSampleId === sample.id;
            const isUnsupported = sample.category === 'unsupported';
            return (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`p-1.5 rounded-lg text-left transition-all border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? isUnsupported
                      ? 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400'
                      : 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="aspect-4/3 rounded overflow-hidden mb-1 bg-slate-100 relative">
                  <img
                    src={sample.imagePath}
                    alt={sample.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-1 left-1 text-[8px] font-mono px-1 rounded font-semibold ${
                    sample.category === 'cow' ? 'bg-amber-800 text-white' : sample.category === 'buffalo' ? 'bg-slate-900 text-white' : 'bg-rose-700 text-white'
                  }`}>
                    {sample.category === 'cow' ? 'Cow' : sample.category === 'buffalo' ? 'Buffalo' : 'Reject'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold block truncate leading-tight">
                    {sample.breedName}
                  </span>
                  <span className="text-[9px] text-slate-500 capitalize block truncate mt-0.5">
                    Real-Life Photo
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workbench Grid: Upload/Preview Left (Col 5) + Analysis/Results Right (Col 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Upload & Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Photographic Input
              </h3>
              {selectedImage && (
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Dropzone / Preview Stage */}
            {selectedImage ? (
              <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-950 aspect-4/3 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Uploaded livestock preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-md transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors flex flex-col items-center justify-center min-h-[260px] ${
                  isDragging
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-3">
                  <Upload className="w-6 h-6 text-slate-600" />
                </div>
                <h4 className="text-xs font-semibold text-slate-800">
                  Drag and drop animal photograph here
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                  Supports JPG, JPEG, PNG, and WEBP formats (Max 20MB)
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer shadow-2xs"
                  >
                    Browse Files
                  </button>
                  <button
                    onClick={() => setIsCameraOpen(true)}
                    className="px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Live Camera</span>
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />

            {/* Validation Error Alert */}
            {validationError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Analyze Action Bar */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => handleRunAnalysis()}
                disabled={!selectedImage || isAnalyzing}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing Neural Features...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    <span>Analyze Image (Two-Stage Model)</span>
                  </>
                )}
              </button>

              {selectedImage && (
                <button
                  onClick={() => setIsCameraOpen(true)}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer shrink-0"
                  title="Capture another via camera"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* In-progress stage execution indicator */}
            {isAnalyzing && (
              <div className="p-3 bg-slate-900 text-white rounded-lg space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>MobileNetV2 Inference Active</span>
                </div>
                <p className="text-slate-300 text-xs">
                  {analysisStep}
                </p>
              </div>
            )}
          </div>

          {/* Photographic Quality Guidelines card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-600">
            <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px]">
              Photographic Best Practices
            </span>
            <ul className="space-y-1 text-[11px] list-disc pl-4 text-slate-600">
              <li>Capture lateral (side-profile) full-body or lateral head views.</li>
              <li>Ensure horn curvature and cranial forehead profile are unobstructed.</li>
              <li>Avoid heavy mud or severe shadows across the dewlap and ears.</li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Results & Diagnostic Dossier */}
        <div className="lg:col-span-7 space-y-4">
          {result ? (
            result.status === 'success' && result.breedInfo ? (
              /* SUCCESS PREDICTION CARD */
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-6 p-6">
                {/* Result Header Badge */}
                <div className="border-b border-slate-200 pb-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                        {result.speciesLabel}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-xs font-mono text-slate-500">
                        Latency: {result.latencyMs}ms
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{result.breedConfidence.toFixed(1)}% Confidence</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                      {result.predictedBreedName}
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      ICAR-NBAGR Accession: {result.breedInfo.accessionCode}
                    </p>
                  </div>
                </div>

                {/* Calibrated Confidence Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700">Model Prediction Probability</span>
                    <span className="font-mono text-slate-900 font-bold">{result.breedConfidence.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-emerald-700 h-2.5 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${result.breedConfidence}%` }}
                    />
                  </div>
                </div>

                {/* Quick Livestock Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Native Origin</span>
                    <span className="font-semibold text-slate-900 block mt-0.5 line-clamp-1">
                      {result.breedInfo.nativeRegion}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Purpose</span>
                    <span className="font-semibold text-slate-900 block mt-0.5">
                      {result.breedInfo.primaryPurpose}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Lactation Yield</span>
                    <span className="font-semibold text-emerald-800 block mt-0.5 font-mono">
                      {result.breedInfo.averageLactationYieldKg}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Butterfat</span>
                    <span className="font-semibold text-slate-900 block mt-0.5 font-mono">
                      {result.breedInfo.fatPercentage}
                    </span>
                  </div>
                </div>

                {/* Detected Anatomical Hallmarks Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Detected Phenotypic Hallmarks (ICAR-NBAGR Descriptors)
                  </h4>
                  <div className="rounded-lg border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                    <div className="grid grid-cols-3 p-2.5 bg-slate-50 font-medium text-slate-500 text-[11px]">
                      <span>Feature</span>
                      <span className="col-span-2">Morphological Observation</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-semibold text-slate-800">Horn Structure</span>
                      <span className="col-span-2 text-slate-700">{result.detectedHallmarks.horns}</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5 bg-slate-50/50">
                      <span className="font-semibold text-slate-800">Cranial / Forehead</span>
                      <span className="col-span-2 text-slate-700">{result.detectedHallmarks.forehead}</span>
                    </div>
                    {result.detectedHallmarks.ears && (
                      <div className="grid grid-cols-3 p-2.5">
                        <span className="font-semibold text-slate-800">Ear Morphology</span>
                        <span className="col-span-2 text-slate-700">{result.detectedHallmarks.ears}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-3 p-2.5 bg-slate-50/50">
                      <span className="font-semibold text-slate-800">Coat Pigmentation</span>
                      <span className="col-span-2 text-slate-700">{result.detectedHallmarks.coatColor}</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-semibold text-slate-800">Dewlap & Hump</span>
                      <span className="col-span-2 text-slate-700">{result.detectedHallmarks.humpAndDewlap}</span>
                    </div>
                  </div>
                </div>

                {/* Secondary Class Alternatives */}
                {result.secondaryPredictions.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Secondary Class Probabilities (Stage 2 Softmax)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {result.secondaryPredictions.map((sec) => (
                        <div key={sec.breed} className="p-2 bg-slate-50 rounded border border-slate-200 text-xs flex justify-between">
                          <span className="text-slate-700">{sec.breed}</span>
                          <span className="font-mono text-slate-500">{sec.confidence.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Execution Pipeline Trace */}
                <div className="bg-slate-900 text-slate-200 p-3 rounded-lg text-[11px] font-mono space-y-1">
                  <div className="text-emerald-400 font-semibold">Inference Pipeline Execution:</div>
                  <div>· {result.executionStages.stage1Species}</div>
                  <div>· {result.executionStages.stage2Breed}</div>
                  <div>· Confidence check: {result.executionStages.confidenceCheck}</div>
                </div>

                {/* Action button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Try Another Photograph
                  </button>
                  <button
                    onClick={() => setActivePage('library')}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View {result.predictedBreedName} in Library</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* REJECTION / UNCERTAIN SAFEGUARD CARD */
              <div className="bg-white rounded-xl border border-rose-200 shadow-xs p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase text-rose-700 tracking-wider">
                      Rejection Safeguard Triggered
                    </span>
                    <h3 className="text-xl font-bold text-slate-950">
                      Unable to identify reliably
                    </h3>
                    <p className="text-xs text-rose-800 font-medium">
                      {result.rejectionReason}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-rose-50/60 rounded-lg border border-rose-200 text-xs space-y-2 text-rose-950">
                  <span className="font-bold block">Why was this image rejected?</span>
                  <p className="leading-relaxed">
                    The system is strictly designed and trained for registered Indian cows (<em>Bos indicus</em>) and riverine buffaloes (<em>Bubalus bubalis</em>). When presented with a non-livestock animal (e.g. dog, cat, horse), an inanimate object, or a severely blurry input, the Stage 1 species confidence falls below the empirical 65% threshold.
                  </p>
                  <div className="pt-1 text-[11px] font-mono text-rose-800">
                    Evaluated Species Probability: {result.speciesConfidence}% (Threshold: &ge;65.0%)
                  </div>
                </div>

                {/* Diagnostics */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">
                    Observed Image Characteristics
                  </span>
                  <div className="rounded-lg border border-slate-200 divide-y divide-slate-100 text-xs">
                    <div className="p-2.5 flex justify-between bg-slate-50">
                      <span className="font-semibold text-slate-700">Subject Type</span>
                      <span className="text-slate-600">{result.speciesLabel}</span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="font-semibold text-slate-700">Cranial Horns</span>
                      <span className="text-slate-600">{result.detectedHallmarks.horns}</span>
                    </div>
                    <div className="p-2.5 flex justify-between bg-slate-50/50">
                      <span className="font-semibold text-slate-700">Forehead Profile</span>
                      <span className="text-slate-600">{result.detectedHallmarks.forehead}</span>
                    </div>
                  </div>
                </div>

                {/* Action recommendations */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Try Another Photograph
                  </button>
                  <button
                    onClick={() => handleSelectSample(SAMPLE_TEST_IMAGES[0])}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                  >
                    Test Purebred Gir Cow Sample &rarr;
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-10 text-center space-y-4 flex flex-col items-center justify-center min-h-[380px]">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h3 className="text-base font-bold text-slate-900">
                  Awaiting Photographic Analysis
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select a test specimen from the toolbar above or upload your own image. Click &quot;Analyze Image&quot; to execute the two-stage inference model.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* REAL-LIFE SPECIMEN DATASET SHOWCASE (4 COWS & 4 BUFFALOES) */}
      <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Photographic Dataset & Benchmarks
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1">
              Real-Life Specimen Gallery: 4 Cows & 4 Buffaloes
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Authentic documentary field photographs captured in rural Indian dairy farmsteads, village courtyards, and agricultural sheds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
              8 Real-Life Classes
            </span>
          </div>
        </div>

        {/* 4 COWS SECTION */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              4 Indian Cows (Bos indicus) · Real-Life Photographs
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAMPLE_TEST_IMAGES.filter((s) => s.category === 'cow').map((specimen) => (
              <div
                key={specimen.id}
                className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-emerald-600 transition-all"
              >
                <div>
                  <div className="aspect-4/3 relative bg-slate-900 overflow-hidden group">
                    <img
                      src={specimen.imagePath}
                      alt={specimen.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded">
                      Real-Life Field Specimen
                    </div>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-950">
                      {specimen.breedName} Cow
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {specimen.notes}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 pt-0 flex items-center justify-between gap-2 border-t border-slate-200/60 mt-2">
                  <a
                    href={specimen.imagePath}
                    download={`${specimen.breedName.toLowerCase().replace(/\s+/g, '_')}_cow_reallife.jpg`}
                    className="text-[11px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Download Image
                  </a>
                  <button
                    onClick={() => {
                      handleSelectSample(specimen);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors cursor-pointer"
                  >
                    Test in AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 BUFFALOES SECTION */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              4 Riverine Buffaloes (Bubalus bubalis) · Real-Life Photographs
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAMPLE_TEST_IMAGES.filter((s) => s.category === 'buffalo').map((specimen) => (
              <div
                key={specimen.id}
                className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-emerald-600 transition-all"
              >
                <div>
                  <div className="aspect-4/3 relative bg-slate-900 overflow-hidden group">
                    <img
                      src={specimen.imagePath}
                      alt={specimen.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded">
                      Real-Life Field Specimen
                    </div>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-950">
                      {specimen.breedName} Buffalo
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {specimen.notes}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 pt-0 flex items-center justify-between gap-2 border-t border-slate-200/60 mt-2">
                  <a
                    href={specimen.imagePath}
                    download={`${specimen.breedName.toLowerCase().replace(/\s+/g, '_')}_buffalo_reallife.jpg`}
                    className="text-[11px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Download Image
                  </a>
                  <button
                    onClick={() => {
                      handleSelectSample(specimen);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors cursor-pointer"
                  >
                    Test in AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => {
          setSelectedImage(dataUrl);
          setImageFile(null);
          setActiveSampleId(null);
          setResult(null);
          handleRunAnalysis(dataUrl);
        }}
      />
    </div>
  );
};
