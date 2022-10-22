export type CommandOptions = {
  command: string;
  value: string;
  debug?: true;
};

export type SendCommandHandler = <T>(opts: CommandOptions) => Promise<T>;
