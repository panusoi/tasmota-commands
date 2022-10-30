import { Logger } from '../types/commands';
import { CommandHandler } from '../types/handler';

export abstract class Commands {
  protected readonly commandHandler: CommandHandler;
  protected readonly logger?: Logger;
  constructor(commandHandler: CommandHandler, logger?: Logger) {
    this.commandHandler = commandHandler;
    this.logger = logger;
  }
}
