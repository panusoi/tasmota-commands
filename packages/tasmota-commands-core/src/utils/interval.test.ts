import { setAsyncInterval } from './interval';

describe('Interval utils', () => {
  describe('setAsyncInterval', () => {
    test('should run command every 25 ms', async () => {
      const start = new Date();
      let end = new Date();
      let runs = 0;

      const interval = setAsyncInterval(async () => {
        if (runs === 0) {
          end = new Date();
        }
        runs++;
      }, 25);

      await new Promise((r) => setTimeout(r, 100));
      interval.stop();

      expect(runs).toBeGreaterThanOrEqual(3);
      expect(end.getTime() - start.getTime()).toBeGreaterThanOrEqual(5);
      expect(end.getTime() - start.getTime()).toBeLessThanOrEqual(50);
    });

    test('should trigger onStart and onStop', async () => {
      let isStarted = false;
      let isStopped = false;

      const interval = setAsyncInterval(async () => new Promise<void>((r) => r()), 10, {
        onStart: () => {
          isStarted = true;
        },
        onStop: () => {
          isStopped = true;
        },
      });
      interval.start();
      interval.stop();
      await new Promise((r) => setTimeout(r, 20));

      expect(isStarted).toBe(true);
      expect(isStopped).toBe(true);
    });
  });
});
