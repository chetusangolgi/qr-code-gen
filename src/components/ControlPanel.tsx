import { useState } from 'react';
import type { QRConfig, DotType, CornerSquareType, CornerDotType, LogoConfig, FrameConfig } from '../types/qr-options';
import { GradientPicker } from './controls/GradientPicker';
import { DotStyleSelector } from './controls/DotStyleSelector';
import { CornerStyleSelector } from './controls/CornerStyleSelector';
import { LogoUploader } from './controls/LogoUploader';
import { FrameEditor } from './controls/FrameEditor';

interface ControlPanelProps {
  config: QRConfig;
  onChange: (config: QRConfig) => void;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {title}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`text-zinc-400 transition-transform duration-200 dark:text-zinc-500 ${open ? '' : '-rotate-90'}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

export function ControlPanel({ config, onChange }: ControlPanelProps) {
  const update = (partial: Partial<QRConfig>) => onChange({ ...config, ...partial });

  return (
    <div>
      <Section title="Pattern">
        <DotStyleSelector
          value={config.dotType}
          onChange={(dotType: DotType) => update({ dotType })}
        />
      </Section>

      <Section title="Corners">
        <CornerStyleSelector
          cornerSquare={config.cornerSquareType}
          cornerDot={config.cornerDotType}
          onCornerSquareChange={(cornerSquareType: CornerSquareType) =>
            update({ cornerSquareType })
          }
          onCornerDotChange={(cornerDotType: CornerDotType) =>
            update({ cornerDotType })
          }
        />
      </Section>

      <Section title="Colors">
        <div className="space-y-5">
          <GradientPicker
            label="Foreground"
            solidColor={config.fgColor}
            gradient={config.fgGradient}
            onSolidColorChange={(fgColor) => update({ fgColor })}
            onGradientChange={(fgGradient) => update({ fgGradient })}
          />
          <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
          <GradientPicker
            label="Background"
            solidColor={config.bgColor}
            gradient={config.bgGradient}
            onSolidColorChange={(bgColor) => update({ bgColor })}
            onGradientChange={(bgGradient) => update({ bgGradient })}
          />
        </div>
      </Section>

      <Section title="Logo" defaultOpen={false}>
        <LogoUploader
          logo={config.logo}
          onChange={(logo: LogoConfig) => update({ logo })}
        />
      </Section>

      <Section title="Frame" defaultOpen={false}>
        <FrameEditor
          frame={config.frame}
          onChange={(frame: FrameConfig) => update({ frame })}
        />
      </Section>

      <Section title="Size">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-zinc-600 dark:text-zinc-400">Output size</span>
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-mono font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              {config.size}px
            </span>
          </div>
          <input
            type="range"
            min="150"
            max="600"
            step="10"
            value={config.size}
            onChange={(e) => update({ size: Number(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-600">
            <span>150</span>
            <span>600</span>
          </div>
        </div>
      </Section>
    </div>
  );
}
