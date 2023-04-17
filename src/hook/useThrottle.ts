import * as React from 'react';

export const useLatest = <T extends any>(current: T) => {
  const storedValue = React.useRef(current);
  React.useEffect(() => {
    storedValue.current = current;
  });
  return storedValue;
};

const now = () => Date.now();

export function useThrottleCallback<CallbackArguments extends any[]>(
  callback: (...args: CallbackArguments) => void,
  wait = 300,
  leading = false
): (...args: CallbackArguments) => void {
  const storedCallback = useLatest(callback);
  const ms = wait;
  const prev = React.useRef(0);
  const trailingTimeout = React.useRef<ReturnType<typeof setTimeout>>();
  const clearTrailing = () => trailingTimeout.current && clearTimeout(trailingTimeout.current);
  const deps = [wait, leading, storedCallback];

  // Reset any time the deps change
  React.useEffect(
    () => () => {
      prev.current = 0;
      clearTrailing();
    },
    deps
  );

  return React.useCallback(function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const rightNow = now();
    const call = () => {
      prev.current = rightNow;
      clearTrailing();
      storedCallback.current.apply(null, args as any);
    };
    const current = prev.current;
    // leading
    if (leading && current === 0) return call();
    // body
    if (rightNow - current > ms) {
      if (current > 0) return call();
      prev.current = rightNow;
    }
    // trailing
    clearTrailing();
    trailingTimeout.current = setTimeout(() => {
      call();
      prev.current = 0;
    }, ms);
  }, deps);
}

export function useThrottle<State>(
  initialState: State | (() => State),
  fps?: number,
  leading?: boolean
): [State, React.Dispatch<React.SetStateAction<State>>] {
  const state = React.useState<State>(initialState);
  return [state[0], useThrottleCallback(state[1], fps, leading)];
}
