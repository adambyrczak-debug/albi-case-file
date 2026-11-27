import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, SkipForward, Lock } from 'lucide-react';
import { SiteContent } from '../types/content';

interface IntroFolderProps {
  intro: SiteContent['intro'];
  onComplete: () => void;
}

export const IntroFolder: React.FC<IntroFolderProps> = ({ intro, onComplete }) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    window.setTimeout(() => {
      onComplete();
    }, 950);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="no-print fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090808] px-6 overflow-hidden"
      >
        <div className="desk-spotlight pointer-events-none absolute inset-0" />
        <div className="venetian-shadow pointer-events-none absolute inset-0 opacity-60" />

        <motion.div
          animate={
            opening
              ? { scale: 1.12, opacity: 0, rotateX: 28, y: -24 }
              : { scale: 1, opacity: 1, rotateX: 0, y: 0 }
          }
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl border border-[#B9AD99]/40 bg-[#191715] p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
        >
          {/* Manila Folder Tab */}
          <div className="absolute -top-8 left-0 flex items-center gap-2 border border-b-0 border-[#B9AD99]/40 bg-[#191715] px-5 py-1.5 font-mono text-xs tracking-[0.22em] text-[#E8E0D0]">
            <Lock className="h-3.5 w-3.5 text-[#8F2929]" />
            {intro.caseLabel}
          </div>

          {/* Red string corner accent */}
          <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 overflow-hidden">
            <div className="absolute -right-8 top-4 w-28 rotate-45 bg-[#8F2929] py-1 text-center font-mono text-[9px] tracking-widest text-[#E8E0D0] shadow">
              TOP SECRET
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="stamp-red text-xs font-bold">{intro.stamp}</span>
            <span className="font-mono text-[11px] tracking-widest text-[#777777]">
              DEPT // PL-MICROMACRO
            </span>
          </div>

          <div className="mt-10 border-t border-b border-[#B9AD99]/20 py-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#8F2929]">
              INVESTIGATION DOSSIER
            </p>
            <h1 className="mt-3 font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#E8E0D0]">
              {intro.title}
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[#B9AD99]">
              {intro.subtitle}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleOpen}
              className="inline-flex items-center gap-2.5 bg-[#8F2929] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-[#E8E0D0] shadow-lg transition-all hover:bg-[#a63232] hover:shadow-[#8F2929]/30"
            >
              <FolderOpen className="h-4 w-4" />
              {intro.openButtonLabel}
            </button>

            <button
              type="button"
              onClick={onComplete}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#777777] transition-colors hover:text-[#E8E0D0]"
            >
              <SkipForward className="h-3.5 w-3.5" />
              {intro.skipButtonLabel}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
