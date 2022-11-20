export type AsyncInterval = {
  start: () => void;
  stop: () => void;
  setIntervalMs: (ms: number) => void;
  running: boolean;
};

export type AsyncIntervalOpts = {
  startOnInit?: boolean;
  onStart?: () => void;
  onStop?: () => void;
};

/**
 * Creates an interval that waits for an async function to complete before making the next call
 *
 * @param asyncFn
 * @param ms
 * @param opts
 * @returns
 */
export const setAsyncInterval = (
  asyncFn: () => Promise<unknown>,
  ms: number,
  opts: AsyncIntervalOpts = {
    startOnInit: true,
  },
): AsyncInterval => {
  let running = false;
  let timeout = ms;

  const asyncDelay = (timeout: number) => new Promise((res) => setTimeout(() => res(1), timeout));

  const run = async () => {
    await asyncDelay(timeout);
    await asyncFn();
    if (running) {
      run();
    } else {
      opts.onStop?.();
    }
  };

  const start = () => {
    if (!running && timeout > 0) {
      running = true;
      run();
      opts.onStart?.();
    }
  };

  const stop = () => {
    if (running) {
      running = false;
    }
  };

  const setIntervalMs = (ms: number) => {
    timeout = ms;
  };

  if (opts.startOnInit) {
    start();
  }

  return { start, stop, setIntervalMs, running };
};
