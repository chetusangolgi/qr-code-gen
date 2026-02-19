import { useRef, useEffect, useCallback, useMemo } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QRConfig } from '../types/qr-options';

function buildOptions(config: QRConfig) {
  const options: Record<string, unknown> = {
    width: config.size,
    height: config.size,
    data: config.url || 'https://example.com',
    type: 'canvas',
    margin: 20,
    dotsOptions: {
      type: config.dotType,
      ...(config.fgGradient.enabled
        ? {
            gradient: {
              type: config.fgGradient.type,
              rotation: (config.fgGradient.rotation * Math.PI) / 180,
              colorStops: [
                { offset: 0, color: config.fgGradient.colorStops[0] },
                { offset: 1, color: config.fgGradient.colorStops[1] },
              ],
            },
          }
        : { color: config.fgColor }),
    },
    backgroundOptions: {
      ...(config.bgGradient.enabled
        ? {
            gradient: {
              type: config.bgGradient.type,
              rotation: (config.bgGradient.rotation * Math.PI) / 180,
              colorStops: [
                { offset: 0, color: config.bgGradient.colorStops[0] },
                { offset: 1, color: config.bgGradient.colorStops[1] },
              ],
            },
          }
        : { color: config.bgColor }),
    },
    cornersSquareOptions: {
      type: config.cornerSquareType,
      ...(config.fgGradient.enabled
        ? {
            gradient: {
              type: config.fgGradient.type,
              rotation: (config.fgGradient.rotation * Math.PI) / 180,
              colorStops: [
                { offset: 0, color: config.fgGradient.colorStops[0] },
                { offset: 1, color: config.fgGradient.colorStops[1] },
              ],
            },
          }
        : { color: config.fgColor }),
    },
    cornersDotOptions: {
      type: config.cornerDotType,
      ...(config.fgGradient.enabled
        ? {
            gradient: {
              type: config.fgGradient.type,
              rotation: (config.fgGradient.rotation * Math.PI) / 180,
              colorStops: [
                { offset: 0, color: config.fgGradient.colorStops[0] },
                { offset: 1, color: config.fgGradient.colorStops[1] },
              ],
            },
          }
        : { color: config.fgColor }),
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      imageSize: config.logo.size,
      margin: config.logo.margin,
      hideBackgroundDots: true,
    },
  };

  if (config.logo.enabled && config.logo.src) {
    options.image = config.logo.src;
  }

  return options;
}

export function useQRCode(config: QRConfig) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCode = useMemo(() => new QRCodeStyling(buildOptions(config)), []);
  const appendedTo = useRef<HTMLDivElement | null>(null);

  // Append QR to container — re-append if the DOM node changes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (appendedTo.current !== el) {
      el.innerHTML = '';
      qrCode.append(el);
      appendedTo.current = el;
    }
  });

  useEffect(() => {
    qrCode.update(buildOptions(config));
  }, [config, qrCode]);

  const downloadPNG = useCallback(
    (size?: number) => {
      if (size) {
        qrCode.update({ width: size, height: size });
        setTimeout(() => {
          qrCode.download({ extension: 'png', name: 'qr-code' });
          qrCode.update({ width: config.size, height: config.size });
        }, 100);
      } else {
        qrCode.download({ extension: 'png', name: 'qr-code' });
      }
    },
    [qrCode, config.size]
  );

  const downloadSVG = useCallback(
    (size?: number) => {
      if (size) {
        qrCode.update({ width: size, height: size, type: 'svg' });
        setTimeout(() => {
          qrCode.download({ extension: 'svg', name: 'qr-code' });
          qrCode.update({ width: config.size, height: config.size, type: 'canvas' });
        }, 100);
      } else {
        const prev = buildOptions(config);
        qrCode.update({ ...prev, type: 'svg' });
        setTimeout(() => {
          qrCode.download({ extension: 'svg', name: 'qr-code' });
          qrCode.update({ ...prev, type: 'canvas' });
        }, 100);
      }
    },
    [qrCode, config]
  );

  return { containerRef, downloadPNG, downloadSVG };
}
