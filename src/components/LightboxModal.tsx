import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { LightboxImage } from '../types/content';

interface LightboxModalProps {
  image: LightboxImage | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (image) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] max-w-4xl border border-[#B9AD99]/40 bg-[#1B1B1B] p-4"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close evidence preview"
          className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center border border-[#E8E0D0]/30 bg-[#8F2929] text-[#E8E0D0] hover:bg-[#a63232]"
        >
          <X className="h-4 w-4" />
        </button>
        <img
          src={image.src}
          alt={image.caption || 'Evidence preview'}
          className="max-h-[75vh] w-auto object-contain"
        />
        {image.caption && (
          <p className="mt-3 border-t border-[#B9AD99]/20 pt-2.5 font-mono text-xs text-[#B9AD99]">
            {image.caption}
          </p>
        )}
      </div>
    </div>
  );
};
