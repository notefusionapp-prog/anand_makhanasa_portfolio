import React, { useState, useEffect } from 'react';

export interface OptimizedProjectImageProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  fallback?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string | number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Automatically computes responsive srcSet for project screens
 * e.g. /images/projects/hira-diary/screen-01.webp -> 320w and 640w variants
 */
function deriveSrcSet(src: string): string | undefined {
  if (!src) return undefined;
  // If it's a project screen in /images/projects/.../screen-XX.webp
  const match = src.match(/^(.*\/images\/projects\/[^/]+\/screen-\d{2})(\.webp)$/);
  if (match) {
    const basePath = match[1];
    return `${basePath}-320w.webp 320w, ${basePath}.webp 640w`;
  }
  return undefined;
}

/**
 * Automatically derives clean SVG fallback if not provided
 */
function deriveFallback(src: string): string | undefined {
  if (!src) return undefined;
  const match = src.match(/^(.*\/images\/projects\/[^/]+)\//);
  if (match) {
    return `${match[1]}/fallback.svg`;
  }
  return undefined;
}

export const OptimizedProjectImage: React.FC<OptimizedProjectImageProps> = ({
  src,
  srcSet,
  sizes = '(max-width: 640px) 280px, (max-width: 1024px) 340px, 480px',
  alt,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  fallback,
  className = '',
  containerClassName = '',
  aspectRatio,
  objectFit = 'contain',
  onLoad,
  onError,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [fallbackAttempt, setFallbackAttempt] = useState<number>(0);

  // Sync if src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
    setFallbackAttempt(0);
  }, [src]);

  const computedSrcSet = srcSet || deriveSrcSet(currentSrc);
  const autoFallback = fallback || deriveFallback(src);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    if (fallbackAttempt === 0 && autoFallback && autoFallback !== currentSrc) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[OptimizedProjectImage] Failed to load ${currentSrc}, falling back to ${autoFallback}`);
      }
      setFallbackAttempt(1);
      setCurrentSrc(autoFallback);
      return;
    }

    // If already attempted fallback or no fallback available
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[OptimizedProjectImage] Failed asset: ${src}`);
    }
    setHasError(true);
    setIsLoaded(false);
    if (onError) onError();
  };

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center bg-black/90 ${containerClassName}`}
      style={aspectRatio ? { aspectRatio: `${aspectRatio}` } : undefined}
    >
      {/* Subtle neutral background placeholder while loading (NO large spinners, keeps device frame intact) */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-slate-900/60 animate-pulse pointer-events-none transition-opacity duration-300"
          aria-hidden="true" 
        />
      )}

      {/* Clean elegant neutral fallback when image is unavailable - NEVER shows broken icon or raw alt text */}
      {hasError ? (
        <div 
          className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 select-none"
          role="img"
          aria-label={alt}
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </div>
          <span className="text-[11px] font-medium text-slate-400 tracking-wide text-center">
            Mobile Preview
          </span>
        </div>
      ) : (
        <img
          src={currentSrc}
          srcSet={computedSrcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          onLoad={handleImageLoad}
          onError={handleImageError}
          referrerPolicy="no-referrer"
          className={`w-full h-full transition-opacity duration-300 ease-out select-none pointer-events-none ${
            objectFit === 'contain' ? 'object-contain' : objectFit === 'cover' ? 'object-cover' : 'object-fill'
          } ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        />
      )}
    </div>
  );
};
