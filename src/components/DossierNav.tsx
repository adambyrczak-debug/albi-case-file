import React, { useState } from 'react';
import { Volume2, VolumeX, FileDown, Menu, X } from 'lucide-react';
import { SiteContent } from '../types/content';

interface DossierNavProps {
  meta: SiteContent['meta'];
  navigation: SiteContent['navigation'];
  controls: SiteContent['controls'];
  activeSection: string;
  progress: number;
  audioPlaying: boolean;
  onToggleAudio: () => void;
  onExportPdf: () => void;
}

export const DossierNav: React.FC<DossierNavProps> = ({
  meta,
  navigation,
  controls,
  activeSection,
  progress,
  audioPlaying,
  onToggleAudio,
  onExportPdf,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="no-print fixed top-0 left-0 right-0 z-30 border-b border-[#B9AD99]/20 bg-[#111111]/92 backdrop-blur-md">
      {/* Progress bar */}
      <div className="h-[2px] w-full bg-[#1B1B1B]">
        <div
          className="h-full bg-[#8F2929] transition-all duration-150"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <span className="border border-[#8F2929] px-2 py-0.5 font-mono text-[10px] tracking-widest text-[#8F2929]">
            {meta.caseNumber}
          </span>
          <span className="font-serif text-sm md:text-base font-semibold tracking-wide text-[#E8E0D0]">
            {meta.partnerTag}
          </span>
        </a>

        {/* Desktop quick links */}
        <nav aria-label="Case file sections" className="hidden xl:flex items-center gap-5">
          {navigation.slice(1, 10).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`font-mono text-[11px] uppercase tracking-wider transition-colors ${
                activeSection === item.id
                  ? 'text-[#E8E0D0] underline decoration-[#8F2929] underline-offset-8'
                  : 'text-[#777777] hover:text-[#B9AD99]'
              }`}
            >
              {item.code}. {item.label}
            </a>
          ))}
        </nav>

        {/* Action controls */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={onToggleAudio}
            aria-label="Toggle noir background audio"
            className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
              audioPlaying
                ? 'border-[#8F2929] bg-[#8F2929]/20 text-[#E8E0D0]'
                : 'border-[#B9AD99]/25 text-[#B9AD99] hover:border-[#B9AD99]'
            }`}
          >
            {audioPlaying ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">
              {audioPlaying ? controls.audioOnLabel : controls.audioOffLabel}
            </span>
          </button>

          <button
            type="button"
            onClick={onExportPdf}
            className="hidden sm:inline-flex items-center gap-1.5 border border-[#B9AD99]/25 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#B9AD99] transition-colors hover:border-[#E8E0D0] hover:text-[#E8E0D0]"
          >
            <FileDown className="h-3.5 w-3.5" />
            PDF
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle dossier index"
            className="xl:hidden border border-[#B9AD99]/25 p-1.5 text-[#E8E0D0]"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Dossier Index */}
      {menuOpen && (
        <div className="xl:hidden border-t border-[#B9AD99]/20 bg-[#151515] px-6 py-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-xs uppercase tracking-wider text-[#B9AD99] hover:text-[#E8E0D0]"
              >
                <span className="text-[#8F2929] mr-1.5">{item.code}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
