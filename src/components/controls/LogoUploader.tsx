import { useRef, useCallback } from 'react';
import type { LogoConfig } from '../../types/qr-options';

interface LogoUploaderProps {
  logo: LogoConfig;
  onChange: (logo: LogoConfig) => void;
}

export function LogoUploader({ logo, onChange }: LogoUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange({
          ...logo,
          enabled: true,
          src: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    },
    [logo, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleRemove = () => {
    onChange({ ...logo, enabled: false, src: '' });
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      {!logo.enabled || !logo.src ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className="group flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-zinc-200 py-8 transition-all hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 transition-colors group-hover:bg-zinc-200 group-hover:text-zinc-600 dark:bg-zinc-800 dark:text-zinc-500 dark:group-hover:bg-zinc-700 dark:group-hover:text-zinc-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
              Upload logo
            </p>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
              PNG, JPG, SVG up to 5MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Logo preview + remove */}
          <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
            <img
              src={logo.src}
              alt="Logo"
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">Logo uploaded</p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Click remove to clear</p>
            </div>
            <button
              onClick={handleRemove}
              className="rounded-md px-2.5 py-1 text-[11px] font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
            >
              Remove
            </button>
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-zinc-500 dark:text-zinc-400">Size</span>
                <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {Math.round(logo.size * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.5"
                step="0.05"
                value={logo.size}
                onChange={(e) => onChange({ ...logo, size: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-zinc-500 dark:text-zinc-400">Padding</span>
                <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {logo.margin}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={logo.margin}
                onChange={(e) => onChange({ ...logo, margin: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
