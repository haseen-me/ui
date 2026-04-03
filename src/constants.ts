import { Size } from './types';

/** Maps sizes to their corresponding height values in pixels */
export const SIZE_HEIGHT: Record<Size.SMALL | Size.MEDIUM | Size.LARGE, number> = {
  [Size.SMALL]: 32,
  [Size.MEDIUM]: 36,
  [Size.LARGE]: 42,
};
