export type DotType = 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';
export type GradientType = 'linear' | 'radial';

export interface GradientConfig {
  enabled: boolean;
  type: GradientType;
  rotation: number;
  colorStops: [string, string];
}

export interface FrameConfig {
  enabled: boolean;
  text: string;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
}

export interface LogoConfig {
  enabled: boolean;
  src: string;
  size: number;
  margin: number;
}

export interface QRConfig {
  url: string;
  size: number;
  fgColor: string;
  bgColor: string;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  fgGradient: GradientConfig;
  bgGradient: GradientConfig;
  logo: LogoConfig;
  frame: FrameConfig;
}

export const defaultConfig: QRConfig = {
  url: 'https://example.com',
  size: 600,
  fgColor: '#000000',
  bgColor: '#ffffff',
  dotType: 'square',
  cornerSquareType: 'square',
  cornerDotType: 'square',
  fgGradient: {
    enabled: false,
    type: 'linear',
    rotation: 0,
    colorStops: ['#8b5cf6', '#ec4899'],
  },
  bgGradient: {
    enabled: false,
    type: 'linear',
    rotation: 0,
    colorStops: ['#ffffff', '#f0f0f0'],
  },
  logo: {
    enabled: false,
    src: '',
    size: 0.4,
    margin: 5,
  },
  frame: {
    enabled: false,
    text: 'Scan Me!',
    fontSize: 16,
    textColor: '#ffffff',
    backgroundColor: '#000000',
  },
};
