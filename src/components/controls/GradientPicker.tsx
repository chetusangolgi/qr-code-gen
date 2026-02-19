import type { GradientConfig, GradientType } from '../../types/qr-options';

interface GradientPickerProps {
  label: string;
  solidColor: string;
  gradient: GradientConfig;
  onSolidColorChange: (color: string) => void;
  onGradientChange: (gradient: GradientConfig) => void;
}

export function GradientPicker({
  label,
  solidColor,
  gradient,
  onSolidColorChange,
  onGradientChange,
}: GradientPickerProps) {
  const update = (partial: Partial<GradientConfig>) =>
    onGradientChange({ ...gradient, ...partial });

  return (
    <div className="space-y-3">
      {/* Header with label + gradient toggle */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">Gradient</span>
          <button
            onClick={() => update({ enabled: !gradient.enabled })}
            className={`relative h-5 w-9 rounded-full transition-colors ${
              gradient.enabled
                ? 'bg-zinc-900 dark:bg-zinc-100'
                : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all dark:bg-zinc-900 ${
                gradient.enabled ? 'left-[18px]' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {!gradient.enabled ? (
        /* Solid color picker */
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={solidColor}
            onChange={(e) => onSolidColorChange(e.target.value)}
            className="h-9 w-9 cursor-pointer rounded-lg"
          />
          <input
            type="text"
            value={solidColor}
            onChange={(e) => onSolidColorChange(e.target.value)}
            className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-[12px] font-mono text-zinc-600 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:focus:border-zinc-600"
          />
        </div>
      ) : (
        <div className="space-y-3">
          {/* Gradient type tabs */}
          <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-800 dark:bg-zinc-800/50">
            {(['linear', 'radial'] as GradientType[]).map((type) => (
              <button
                key={type}
                onClick={() => update({ type })}
                className={`flex-1 rounded-md px-3 py-1.5 text-[12px] font-medium capitalize transition-all ${
                  gradient.type === type
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Color stops */}
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-800">
              <input
                type="color"
                value={gradient.colorStops[0]}
                onChange={(e) =>
                  update({ colorStops: [e.target.value, gradient.colorStops[1]] })
                }
                className="h-6 w-6 cursor-pointer rounded"
              />
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                {gradient.colorStops[0]}
              </span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-zinc-300 dark:text-zinc-600">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-800">
              <input
                type="color"
                value={gradient.colorStops[1]}
                onChange={(e) =>
                  update({ colorStops: [gradient.colorStops[0], e.target.value] })
                }
                className="h-6 w-6 cursor-pointer rounded"
              />
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                {gradient.colorStops[1]}
              </span>
            </div>
          </div>

          {/* Preview bar */}
          <div
            className="h-5 w-full rounded-lg"
            style={{
              background:
                gradient.type === 'linear'
                  ? `linear-gradient(${gradient.rotation}deg, ${gradient.colorStops[0]}, ${gradient.colorStops[1]})`
                  : `radial-gradient(circle, ${gradient.colorStops[0]}, ${gradient.colorStops[1]})`,
            }}
          />

          {/* Rotation (linear) */}
          {gradient.type === 'linear' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-zinc-500 dark:text-zinc-400">Angle</span>
                <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {gradient.rotation}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={gradient.rotation}
                onChange={(e) => update({ rotation: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
