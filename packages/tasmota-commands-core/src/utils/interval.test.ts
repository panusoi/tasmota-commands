import { setAsyncInterval } from './interval';

describe('Interval utils', () => {
  describe('setAsyncInterval', () => {
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
