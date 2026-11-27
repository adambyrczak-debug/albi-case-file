import React, { useState } from 'react';
import { Camera, Maximize2 } from 'lucide-react';

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  placeholderLabel: string;
  aspectClass?: string;
  className?: string;
  onExpand?: (src: string, caption: string) => void;
  caption?: string;
  showTape?: boolean;
  exhibitCode?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  src,
  alt,
  placeholderLabel,
  aspectClass = 'aspect-[4/3]',
  className = '',
  onExpand,
  caption,
  showTape = false,
  exhibitCode,
}) => {
  const [hasError, setHasError] = useState(!src);
  const showPlaceholder = !src || hasError;

  return (
    <div className="relative">
      {showTape && <div className="masking-tape" />}
      <div
        className={`relative overflow-hidden border border-[#B9AD99]/30 bg-[#121110] shadow-inner ${aspectClass} ${className} group`}
      >
        {exhibitCode && (
          <span className="pointer-events-none absolute left-2.5 top-2.5 z-10 bg-[#0C0C0C]/85 px-2 py-0.5 font-mono text-[10px] tracking-widest text-[#B9AD99] border border-[#B9AD99]/25">
            {exhibitCode}
          </span>
        )}

        {!showPlaceholder ? (
          <>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onError={() => setHasError(true)}
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04] grayscale-[35%] sepia-[12%] contrast-[1.08] group-hover:grayscale-0 group-hover:sepia-0"
            />
            {onExpand && src && (
              <button
                type="button"
                onClick={() => onExpand(src, caption || alt)}
                aria-label={`Inspect ${alt}`}
                className="no-print absolute bottom-3 right-3 flex items-center gap-1.5 border border-[#E8E0D0]/40 bg-[#0C0C0C]/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#E8E0D0] opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:border-[#8F2929] hover:bg-[#8F2929]"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                Inspect
              </button>
            )}
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center relative bg-[radial-gradient(circle_at_center,#1E1B18_0%,#100F0E_100%)]">
            {/* Darkroom viewfinder crop marks */}
            <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#8F2929]/75" />
            <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[#8F2929]/75" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#8F2929]/75" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#8F2929]/75" />

            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#B9AD99]/25 bg-[#0C0C0C]/60">
              <Camera className="h-5 w-5 text-[#B9AD99]/70" />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E8E0D0]/85 max-w-[260px] leading-relaxed">
              {placeholderLabel}
            </p>
            {src && (
              <p className="mt-2.5 border-t border-[#B9AD99]/15 pt-2 font-mono text-[10px] text-[#777777] break-all">
                public{src}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
