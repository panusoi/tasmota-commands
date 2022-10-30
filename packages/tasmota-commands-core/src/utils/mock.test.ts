import { CommandHandler } from '../types/handler';

export const commandHandlerMock: CommandHandler = (args) => {
  const { command } = args;

  switch (command) {
    case 'Power0': {
      return Promise.resolve({
        POWER: 'ON',
      });
    }
    case 'State': {
      return Promise.resolve({
        Time: '2022-10-30T14:44:33',
        Uptime: '0T06:09:37',
        UptimeSec: 22177,
        POWER: 'ON',
        Dimmer: 53,
        CT: 400,
      });
    }
    case 'Dimmer': {
      return Promise.resolve({ CT: typeof args.payload === 'number' ? args.payload : 33 });
    }
    case 'CT': {
      return Promise.resolve({ CT: typeof args.payload === 'number' ? args.payload : 250 });
    }
    default: {
      return Promise.reject(new Error('Invalid arguments'));
    }
  }
};

describe('commandHandlerMock', () => {
  test('should create command handler mock', () => {
    expect(commandHandlerMock).not.toBeNull();
  });
});
