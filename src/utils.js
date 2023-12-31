import { TWEEN_DURATION } from './constants';
import { interpolateLab } from 'd3-interpolate';

// https://easings.net/#easeInOutCubic
export function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function lerp(x, y, t) {
  return (1 - t) * x + t * y;
}

export const tweenValue = (target, ms, currentValue, options = {}) => {
  if (!target.val || target.p >= 1 || target === currentValue) return currentValue;
  target.p += ms / TWEEN_DURATION;

  if (options.color) return interpolateLab(target.curr, target.val)(easeInOutCubic(target.p));

  return lerp(target.curr, target.val, easeInOutCubic(target.p));
};
