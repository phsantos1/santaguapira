import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface MediaImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  eager?: boolean;
  darkSurface?: boolean;
}

export function MediaImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  eager = false,
  darkSurface = false,
}: MediaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 p-6 text-center ${
          darkSurface
            ? 'bg-[#221E1B] text-[#D8CFC2]'
            : 'bg-[#EBE3D5] text-[#5C544D]'
        } ${className}`}
      >
        <UtensilsCrossed className="h-7 w-7 opacity-70" aria-hidden="true" />
        <span className="max-w-[22ch] text-xs leading-relaxed">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
