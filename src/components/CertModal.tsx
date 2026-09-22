import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ShieldCheck, FileText, Download } from 'lucide-react';

export interface CertModalData {
  title: string;
  authority: string;
  date: string;
  refId: string;
  score?: string;
  docPath?: string;
  docType?: 'image' | 'pdf';
  details?: string;
}

interface CertModalProps {
  cert: CertModalData | null;
  onClose: () => void;
  triggerToast: (msg: string) => void;
}

export const CertModal: React.FC<CertModalProps> = ({ cert, onClose, triggerToast }) => {
  if (!cert) return null;

  const copyRef = () => {
    navigator.clipboard.writeText(cert.refId).then(() => {
      triggerToast(`Reference ID copied to clipboard: ${cert.refId}`);
    });
  };

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-obsidian-950 border border-obsidian-700/90 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-obsidian-700/80 flex items-start justify-between bg-obsidian-900/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                DOCUMENT INSPECTOR // AUTHENTICATED CREDENTIAL
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100">{cert.title}</h3>
            <div className="text-xs font-mono text-cyan-400 mt-0.5">
              {cert.authority} • Issued: {cert.date}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 bg-obsidian-800 hover:bg-obsidian-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Document Preview Frame */}
          <div className="bg-obsidian-900/90 border border-obsidian-700/80 rounded-xl overflow-hidden min-h-[320px] flex items-center justify-center relative">
            {cert.docType === 'image' && cert.docPath ? (
              <img
                src={cert.docPath}
                alt={`${cert.title} Document`}
                className="max-h-[420px] w-auto object-contain mx-auto"
              />
            ) : cert.docPath ? (
              <iframe
                src={cert.docPath}
                title={cert.title}
                className="w-full h-[400px] border-none"
              />
            ) : (
              <div className="p-8 text-center">
                <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="text-slate-200 font-semibold text-base">{cert.title}</h4>
                <p className="text-slate-400 text-xs mt-1">
                  Verified Academic & Field Credential ({cert.authority})
                </p>
              </div>
            )}
          </div>

          {/* Details & Ref */}
          {cert.details && (
            <p className="text-xs sm:text-sm text-slate-300 bg-obsidian-900/40 p-3.5 rounded-lg border border-obsidian-700/60 leading-relaxed">
              {cert.details}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={copyRef}
              className="bg-obsidian-900 border border-obsidian-700 hover:border-amber-500/50 p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">
                  CREDENTIAL / REGISTRATION ID
                </div>
                <div className="text-xs font-mono font-bold text-amber-400 mt-0.5 group-hover:text-amber-300">
                  {cert.refId}
                </div>
              </div>
              <Copy className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
            </div>

            <div className="bg-obsidian-900 border border-obsidian-700 p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">
                  ISSUING INSTITUTION
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">
                  {cert.authority}
                </div>
              </div>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-obsidian-700/80 bg-obsidian-900/80 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Official Portfolio Record
          </div>
          <div className="flex items-center gap-2">
            {cert.docPath && (
              <a
                href={cert.docPath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/40 rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Open Document
              </a>
            )}
            <button
              onClick={copyRef}
              className="px-3 py-1.5 text-xs font-mono bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-bold rounded-lg transition-colors"
            >
              Copy Reference ID
            </button>
          </div>
        </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
