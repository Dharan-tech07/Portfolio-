import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-obsidian-900 border border-emerald-500/50 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up backdrop-blur-md">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-xs font-mono">{message}</span>
    </div>
  );
};
