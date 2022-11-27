import Mqtt from 'mqtt';

import http from 'http';
import { CommandHandler } from 'tasmota-commands-core';

export type HttpRequestFunction = <T>(options: http.RequestOptions) => Promise<T>;

export type TasmotaMqttOptions = {
  host: string;
  topic: string;
  topicFormat: string;
  port?: number;
  username?: string;
  password?: string;
  connectOnInit?: boolean;
};

const getMqttCommandHandler = ({
  host,
  port,
  topic,
  topicFormat,
  username,
  password,
  connectOnInit = true,
}: TasmotaMqttOptions): CommandHandler => {
  if (!topicFormat.includes('<command>')) {
    throw new Error("Invalid topicFormat, '<command>' is not included");
  }

  if (!topicFormat.includes('%topic%')) {
    throw new Error("Invalid topicFormat, '%topic%' is not included");
  }

  if (!topicFormat.includes('%prefix%')) {
    throw new Error("Invalid topicFormat, '%prefix%' is not included");
  }

  const clientConfig: Mqtt.IClientOptions = {
    protocol: 'mqtt',
    username,
    password,
    port,
    connectTimeout: 10000,
  };

  let client = connectOnInit ? Mqtt.connect(host, clientConfig) : null;

  const handler: CommandHandler = ({ command, payload, logger }) =>
    new Promise((resolve, reject) => {
      let timer: NodeJS.Timeout | undefined = undefined;

      if (client === null) {
        client = Mqtt.connect(host, clientConfig);
      } else if (client.disconnected) {
        client.reconnect();
      }

      const cmnd = topicFormat
        .replace('<command>', command)
        .replace('%topic%', topic)
        .replace('%prefix%', 'cmnd');
      `${payload ?? ''}`;

      // By default Tasmota replies result to ../RESULT
      const resultStat = topicFormat
        .replace('<command>', 'RESULT')
        .replace('%topic%', topic)
        .replace('%prefix%', 'stat');

      // Also listen stat topic of command
      const stat = topicFormat
        .replace('<command>', command)
        .replace('%topic%', topic)
        .replace('%prefix%', 'stat');

      client.on('connect', () => {
        logger?.debug('connnected');
      });

      client.on('message', (topic, message) => {
        logger?.debug('message', topic, message.toString());

        if (topic === stat || topic === resultStat) {
          const json = JSON.parse(message.toString());

          if (typeof json === 'object') {
            clearTimeout(timer);
            client?.unsubscribe([stat, resultStat], undefined, () => {
              resolve(json);
            });
          }
        }
      });

      client.on('offline', () => {
        client?.end();
        clearTimeout(timer);
        reject(new Error('Client offline. Check your connection settings.'));
      });

      client.on('error', (error) => {
        clearTimeout(timer);
        reject(error);
      });

      client.subscribe([stat, resultStat], (error, grants) => {
        if (error) {
          reject(error);
          return;
        }
        logger?.debug('subs', grants.map((a) => `${a.topic} - ${a.qos}`).join(','));
        client?.publish(cmnd, `${payload ?? ''}`);
        timer = setTimeout(() => {
          client?.unsubscribe([stat, resultStat]);
          reject(new Error('Command response timed out after 5s. Check your topic configuration.'));
        }, 5000);
      });
    });

  return handler;
};

export default getMqttCommandHandler;
