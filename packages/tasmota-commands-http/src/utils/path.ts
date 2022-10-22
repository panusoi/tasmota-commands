import { isNotNullOrUndefined } from 'tasmota-commands-core';

type GetCommandPathParams = { cmnd: string } & Record<string, string | number | undefined>;

export const getCommandPath = (params: GetCommandPathParams): string =>
  `/cm?${Object.entries(params)
    .map(([k, v]) =>
      v !== undefined ? `${encodeURIComponent(k)}=${encodeURIComponent(v)}` : undefined,
    )
    .filter(isNotNullOrUndefined)
    .join('&')}`;
