import { useState, useCallback, useRef, useEffect } from 'react';
import { QRCodePreview } from './components/QRCodePreview';
import { ControlPanel } from './components/ControlPanel';
import { useTheme } from './hooks/useTheme';
import { useQRCode } from './hooks/useQRCode';
import { defaultConfig } from './types/qr-options';
import type { QRConfig } from './types/qr-options';

function App() {
  const { isDark, toggle } = useTheme();
  const [config, setConfig] = useState<QRConfig>(defaultConfig);
  const [debouncedConfig, setDebouncedConfig] = useState<QRConfig>(defaultConfig);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const handleConfigChange = useCallback((newConfig: QRConfig) => {
    setConfig(newConfig);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedConfig(newConfig);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const { containerRef, downloadPNG, downloadSVG } = useQRCode(debouncedConfig);

  return (
    <div className="flex h-screen flex-col bg-[#fafafa] text-zinc-900 dark:bg-[#0f0f12] dark:text-zinc-100">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-5 dark:border-zinc-800 dark:bg-[#18181b]">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 dark:bg-zinc-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" fill={isDark ? '#18181b' : '#fff'} />
              <rect x="14" y="3" width="7" height="7" rx="1" fill={isDark ? '#18181b' : '#fff'} />
              <rect x="3" y="14" width="7" height="7" rx="1" fill={isDark ? '#18181b' : '#fff'} />
              <rect x="15" y="15" width="2.5" height="2.5" rx="0.5" fill={isDark ? '#18181b' : '#fff'} />
              <rect x="18.5" y="15" width="2.5" height="2.5" rx="0.5" fill={isDark ? '#18181b' : '#fff'} />
              <rect x="15" y="18.5" width="2.5" height="2.5" rx="0.5" fill={isDark ? '#18181b' : '#fff'} />
              <rect x="18.5" y="18.5" width="2.5" height="2.5" rx="0.5" fill={isDark ? '#18181b' : '#fff'} />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">QR Studio</span>
          <span className="hidden rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 sm:inline-block dark:bg-zinc-800 dark:text-zinc-400">
            v1.0
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main content: sidebar + canvas */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-[340px] shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#18181b]">
          {/* URL Input */}
          <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Content
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400 dark:text-zinc-500">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <input
                type="text"
                value={config.url}
                onChange={(e) => handleConfigChange({ ...config, url: e.target.value })}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-9 pr-3 text-[13px] text-zinc-800 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:bg-zinc-800"
              />
            </div>
          </div>

          {/* Controls (scrollable) */}
          <div className="flex-1 overflow-y-auto">
            <ControlPanel config={config} onChange={handleConfigChange} />
          </div>

          {/* Export buttons at bottom */}
          <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex gap-2">
              <button
                onClick={() => downloadPNG()}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-900 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                PNG
              </button>
              <button
                onClick={() => downloadSVG()}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white py-2.5 text-[13px] font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                SVG
              </button>
            </div>
          </div>
        </aside>

        {/* Canvas area */}
        <main className="flex flex-1 items-center justify-center overflow-auto">
          <QRCodePreview
            config={debouncedConfig}
            containerRef={containerRef}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
