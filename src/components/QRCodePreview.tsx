import type { QRConfig } from '../types/qr-options';

interface QRCodePreviewProps {
  config: QRConfig;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function QRCodePreview({ config, containerRef }: QRCodePreviewProps) {
  const qrContainer = (
    <div
      ref={containerRef}
      className="overflow-hidden [&>canvas]:block [&>canvas]:!h-auto [&>canvas]:!w-full"
      style={{ width: Math.min(config.size, 320) }}
    />
  );

  return (
    <div className="checkerboard flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center">
        <div className="rounded-2xl bg-white p-2 shadow-xl shadow-black/5 dark:bg-zinc-900 dark:shadow-black/20">
          {config.frame.enabled ? (
            <div
              className="flex flex-col items-center overflow-hidden rounded-xl"
              style={{ backgroundColor: config.frame.backgroundColor }}
            >
              <div className="p-4 pb-2">
                {qrContainer}
              </div>
              <p
                className="w-full pb-3 pt-1 text-center font-semibold"
                style={{
                  color: config.frame.textColor,
                  fontSize: `${config.frame.fontSize}px`,
                }}
              >
                {config.frame.text}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl">
              {qrContainer}
            </div>
          )}
        </div>

        <span className="mt-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-zinc-400 backdrop-blur-sm dark:bg-zinc-900/80 dark:text-zinc-500">
          {config.size} x {config.size}
        </span>
      </div>
    </div>
  );
}
