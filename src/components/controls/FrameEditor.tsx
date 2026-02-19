import type { FrameConfig } from '../../types/qr-options';

interface FrameEditorProps {
  frame: FrameConfig;
  onChange: (frame: FrameConfig) => void;
}

export function FrameEditor({ frame, onChange }: FrameEditorProps) {
  const update = (partial: Partial<FrameConfig>) =>
    onChange({ ...frame, ...partial });

  return (
    <div className="space-y-4">
      {/* Enable toggle */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
            Show frame
          </p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            Add a label below the QR code
          </p>
        </div>
        <button
          onClick={() => update({ enabled: !frame.enabled })}
          className={`relative h-5 w-9 rounded-full transition-colors ${
            frame.enabled
              ? 'bg-zinc-900 dark:bg-zinc-100'
              : 'bg-zinc-200 dark:bg-zinc-700'
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all dark:bg-zinc-900 ${
              frame.enabled ? 'left-[18px]' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      {frame.enabled && (
        <div className="space-y-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          {/* Label text */}
          <div className="space-y-1.5">
            <span className="text-[12px] font-medium text-zinc-600 dark:text-zinc-400">Label</span>
            <input
              type="text"
              value={frame.text}
              onChange={(e) => update({ text: e.target.value })}
              placeholder="Scan Me!"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-[13px] text-zinc-800 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:focus:border-zinc-600"
            />
          </div>

          {/* Font size */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-zinc-500 dark:text-zinc-400">Font size</span>
              <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                {frame.fontSize}px
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="28"
              value={frame.fontSize}
              onChange={(e) => update({ fontSize: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <span className="text-[12px] text-zinc-500 dark:text-zinc-400">Text</span>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-800">
                <input
                  type="color"
                  value={frame.textColor}
                  onChange={(e) => update({ textColor: e.target.value })}
                  className="h-6 w-6 cursor-pointer rounded"
                />
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  {frame.textColor}
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="text-[12px] text-zinc-500 dark:text-zinc-400">Background</span>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-800">
                <input
                  type="color"
                  value={frame.backgroundColor}
                  onChange={(e) => update({ backgroundColor: e.target.value })}
                  className="h-6 w-6 cursor-pointer rounded"
                />
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  {frame.backgroundColor}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
