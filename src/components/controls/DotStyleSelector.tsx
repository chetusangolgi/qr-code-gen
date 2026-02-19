import type { DotType } from '../../types/qr-options';

interface DotStyleSelectorProps {
  value: DotType;
  onChange: (value: DotType) => void;
}

const dotStyles: { type: DotType; label: string }[] = [
  { type: 'square', label: 'Square' },
  { type: 'rounded', label: 'Rounded' },
  { type: 'dots', label: 'Circle' },
  { type: 'classy', label: 'Classy' },
  { type: 'classy-rounded', label: 'Elegant' },
  { type: 'extra-rounded', label: 'Soft' },
];

function DotIcon({ type, active }: { type: DotType; active: boolean }) {
  const c = active ? '#18181b' : '#a1a1aa';

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className="dark:hidden">
      <DotShape type={type} fill={c} />
    </svg>
  );
}

function DotIconDark({ type, active }: { type: DotType; active: boolean }) {
  const c = active ? '#ffffff' : '#52525b';

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className="hidden dark:block">
      <DotShape type={type} fill={c} />
    </svg>
  );
}

function DotShape({ type, fill }: { type: DotType; fill: string }) {
  switch (type) {
    case 'square':
      return (
        <>
          <rect x="2" y="2" width="6" height="6" fill={fill} />
          <rect x="10" y="2" width="6" height="6" fill={fill} />
          <rect x="2" y="10" width="6" height="6" fill={fill} />
          <rect x="10" y="10" width="6" height="6" fill={fill} />
          <rect x="18" y="2" width="4" height="4" fill={fill} />
          <rect x="18" y="10" width="4" height="4" fill={fill} />
        </>
      );
    case 'rounded':
      return (
        <>
          <rect x="2" y="2" width="6" height="6" rx="1.5" fill={fill} />
          <rect x="10" y="2" width="6" height="6" rx="1.5" fill={fill} />
          <rect x="2" y="10" width="6" height="6" rx="1.5" fill={fill} />
          <rect x="10" y="10" width="6" height="6" rx="1.5" fill={fill} />
          <rect x="18" y="2" width="4" height="4" rx="1" fill={fill} />
        </>
      );
    case 'dots':
      return (
        <>
          <circle cx="5" cy="5" r="3" fill={fill} />
          <circle cx="13" cy="5" r="3" fill={fill} />
          <circle cx="5" cy="13" r="3" fill={fill} />
          <circle cx="13" cy="13" r="3" fill={fill} />
          <circle cx="20" cy="5" r="2" fill={fill} />
        </>
      );
    case 'classy':
      return (
        <>
          <rect x="2" y="2" width="6" height="6" fill={fill} />
          <path d="M10 2h6v3h-3v3h-3z" fill={fill} />
          <path d="M2 10h3v3h3v3H2z" fill={fill} />
          <rect x="10" y="10" width="6" height="6" fill={fill} />
        </>
      );
    case 'classy-rounded':
      return (
        <>
          <rect x="2" y="2" width="6" height="6" rx="0" fill={fill} />
          <path d="M10 2h3a3 3 0 010 6h-3z" fill={fill} />
          <path d="M2 10h6v3a3 3 0 01-6 0z" fill={fill} />
          <rect x="10" y="10" width="6" height="6" rx="3" fill={fill} />
        </>
      );
    case 'extra-rounded':
      return (
        <>
          <rect x="2" y="2" width="6" height="6" rx="3" fill={fill} />
          <rect x="10" y="2" width="6" height="6" rx="3" fill={fill} />
          <rect x="2" y="10" width="6" height="6" rx="3" fill={fill} />
          <rect x="10" y="10" width="6" height="6" rx="3" fill={fill} />
          <rect x="18" y="4" width="4" height="4" rx="2" fill={fill} />
        </>
      );
  }
}

export function DotStyleSelector({ value, onChange }: DotStyleSelectorProps) {
  return (
    <div className="space-y-3">
      <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
        Pattern
      </span>
      <div className="grid grid-cols-3 gap-2">
        {dotStyles.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 transition-all ${
              value === type
                ? 'border-zinc-900 bg-zinc-900/[0.04] dark:border-zinc-100 dark:bg-white/[0.04]'
                : 'border-zinc-150 bg-transparent hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'
            }`}
          >
            <DotIcon type={type} active={value === type} />
            <DotIconDark type={type} active={value === type} />
            <span className={`text-[10px] font-medium ${
              value === type
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-400 dark:text-zinc-500'
            }`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
