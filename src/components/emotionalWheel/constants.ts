import { Dimensions } from 'react-native';
import { withSpring } from 'react-native-reanimated';
import { Vector } from 'react-native-redash';

const { width } = Dimensions.get('window');
export const PADDING = 24;
export const SIZE = width - PADDING * 2;
export const SIZE_N = SIZE / (SIZE / 250);
export const STROKE = 2;
export const R = (SIZE_N - STROKE) / 2 - 15;
export const { PI } = Math;
export const TAU = 2 * PI;
export const CENTER = { x: SIZE_N / 2, y: SIZE_N / 2 };

export const containedInSquare = (value: Vector, center: Vector, side: number) => {
  'worklet';
  const topLeft = { x: center.x - side / 2, y: center.y - side / 2 };
  return (
    value.x >= topLeft.x &&
    value.y >= topLeft.y &&
    value.x <= topLeft.x + side &&
    value.y <= topLeft.y + side
  );
};

export const normalize = (value: number) => {
  'worklet';
  const rest = value % TAU;
  return rest > 0 ? rest : TAU + rest;
};

export const absoluteDuration = (start: number, end: number) => {
  'worklet';
  return start > end ? end + (TAU - start) : end - start;
};

export const radToMinutes = (rad: number) => {
  'worklet';
  return (24 * 60 * rad) / TAU;
};

export const preFormatDuration = (raw: number) => {
  'worklet';
  const duration = Math.round(raw);
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  return { hours, minutes };
};

export const formatDuration = (duration: number) => {
  'worklet';
  const { hours, minutes } = preFormatDuration(duration);
  return `${('' + hours).padStart(2, '0')}:${('' + minutes).padStart(2, '0')}`;
};

export const myFormat = (duration: number) => {
  'worklet';
  const { hours } = preFormatDuration(duration);
  return hours;
};

export const arc = (x: number, y: number, large = false, sweep = false) => {
  'worklet';
  return `A ${R} ${R} 0 ${large ? '1' : '0'} ${sweep ? '1' : '0'} ${x} ${y}`;
};

export const lineAnimation = (val: number, pos: number) => {
  'worklet';
  const springConfig = {
    damping: 2.5,
    mass: 0.5,
    stiffness: 200,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 1.5,
  };
  if (0 <= val && val <= 0.25) {
    pos = withSpring(0.125 * Math.PI, springConfig);
  }
  if (0.25 < val && val <= 0.5) {
    pos = withSpring(0.375 * Math.PI, springConfig);
  }
  if (0.5 < val && val <= 0.75) {
    pos = withSpring(0.625 * Math.PI, springConfig);
  }
  if (0.75 < val && val <= 1) {
    pos = withSpring(0.875 * Math.PI, springConfig);
  }
  if (1 < val && val <= 1.25) {
    pos = withSpring(1.125 * Math.PI, springConfig);
  }
  if (1.25 < val && val <= 1.5) {
    pos = withSpring(1.375 * Math.PI, springConfig);
  }
  if (1.5 < val && val <= 1.75) {
    pos = withSpring(1.625 * Math.PI, springConfig);
  }
  if (1.75 < val && val < 2) {
    pos = withSpring(1.875 * Math.PI, springConfig);
  }
  return pos;
};

type description = {
  emotion: string;
  description: string;
};

export const descriptions: description[] = [
  {
    emotion: 'Fiducia',
    description:
      'Ti viene presentata qui una breve descrizione sulla fiducia, in modo tale da confrontare quello che hai provato o stai provando con ciò che significa fiducia.',
  },
  {
    emotion: 'Gioia',
    description:
      'Ti viene presentata qui una breve descrizione sulla gioia, in modo tale da confrontare quello che hai provato o stai provando con ciò che significa gioia.',
  },
  {
    emotion: 'Aspettativa',
    description:
      "Ti viene presentata qui una breve descrizione sull'aspettativa, in modo tale da confrontare quello che hai provato o stai provando con ciò che significa aspettativa.",
  },
  {
    emotion: 'Rabbia',
    description:
      'Ti viene presentata qui una breve descrizione sulla rabbia, in modo tale da confrontare quello che hai provato o stai provando con ciò che significa rabbia.',
  },
  {
    emotion: 'Disgusto',
    description:
      'Ti viene presentata qui una breve descrizione sul disgusto, in modo tale da confrontare quello che hai provato o stai provando con ciò che significa disgusto.',
  },
  {
    emotion: 'Tristezza',
    description:
      'Ti viene presentata qui una breve descrizione sulla tristezza, in modo tale da confrontare quello che hai provato o stai provando con ciò che significa tristezza.',
  },
  {
    emotion: 'Sorpresa',
    description:
      'Ti viene presentata qui una breve descrizione sulla sorpresa, in modo tale da confrontare quello che hai provato o stai provando con ciò che significa sorpresa.',
  },
  {
    emotion: 'Paura',
    description:
      'Ti viene presentata qui una breve descrizione sulla paura, in modo tale da confrontare quello che hai provato o stai provando con ciò che significa paura.',
  },
];

export const selectDescription = (val: number) => {
  'worklet';
  if (0 <= val && val <= 0.25) return descriptions[0];
  if (0.25 < val && val <= 0.5) return descriptions[1];
  if (0.5 < val && val <= 0.75) return descriptions[2];
  if (0.75 < val && val <= 1) return descriptions[3];
  if (1 < val && val <= 1.25) return descriptions[4];
  if (1.25 < val && val <= 1.5) return descriptions[5];
  if (1.5 < val && val <= 1.75) return descriptions[6];
  if (1.75 < val && val < 2) return descriptions[7];
  else return descriptions[1];
};
