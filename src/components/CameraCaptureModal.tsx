import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCapturedImage(null);
      setErrorMsg(null);
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setErrorMsg(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setErrorMsg('Camera access was denied or not supported by this browser. Please upload an image file instead.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setCapturedImage(dataUrl);
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-slate-900">
              Live Livestock Camera Capture
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport */}
        <div className="p-4 bg-slate-900 flex flex-col items-center justify-center min-h-[320px] relative">
          {errorMsg ? (
            <div className="text-center p-6 text-slate-300 space-y-2">
              <Camera className="w-8 h-8 mx-auto text-slate-500" />
              <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>
              <p className="text-xs text-slate-400">
                You can drag & drop or upload photos directly from the file browser.
              </p>
            </div>
          ) : capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured Livestock"
              className="max-h-[360px] w-auto rounded-lg object-contain shadow-md"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="max-h-[360px] w-full rounded-lg object-cover"
            />
          )}

          {/* Guide Overlay for Livestock */}
          {!capturedImage && !errorMsg && (
            <div className="absolute inset-x-8 inset-y-12 border border-dashed border-emerald-400/50 rounded-lg pointer-events-none flex flex-col justify-between p-2">
              <span className="text-[10px] text-emerald-300 font-mono self-start bg-slate-900/70 px-1.5 py-0.5 rounded">
                Align cattle/buffalo profile
              </span>
              <span className="text-[10px] text-emerald-300 font-mono self-end bg-slate-900/70 px-1.5 py-0.5 rounded">
                Ensure head & horns are visible
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          {capturedImage ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCapturedImage(null)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Use Photo</span>
              </button>
            </div>
          ) : (
            <button
              onClick={takeSnapshot}
              disabled={!!errorMsg}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Capture Snapshot</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
