import type { CornerSquareType, CornerDotType } from '../../types/qr-options';

interface CornerStyleSelectorProps {
  cornerSquare: CornerSquareType;
  cornerDot: CornerDotType;
  onCornerSquareChange: (value: CornerSquareType) => void;
  onCornerDotChange: (value: CornerDotType) => void;
}

const cornerSquareTypes: { type: CornerSquareType; label: string }[] = [
  { type: 'square', label: 'Sharp' },
  { type: 'dot', label: 'Rounded' },
  { type: 'extra-rounded', label: 'Pill' },
];

const cornerDotTypes: { type: CornerDotType; label: string }[] = [
  { type: 'square', label: 'Square' },
  { type: 'dot', label: 'Circle' },
];

function ToggleGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { type: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-2">
      <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-800 dark:bg-zinc-800/50">
        {options.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`flex-1 rounded-md px-3 py-1.5 text-[12px] font-medium transition-all ${
              value === type
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CornerStyleSelector({
  cornerSquare,
  cornerDot,
  onCornerSquareChange,
  onCornerDotChange,
}: CornerStyleSelectorProps) {
  return (
    <div className="space-y-4">
      <ToggleGroup
        label="Outer Corner"
        options={cornerSquareTypes}
        value={cornerSquare}
        onChange={onCornerSquareChange}
      />
      <ToggleGroup
        label="Inner Corner"
        options={cornerDotTypes}
        value={cornerDot}
        onChange={onCornerDotChange}
      />
    </div>
  );
}
