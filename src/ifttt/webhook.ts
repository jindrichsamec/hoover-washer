import fetch, { Response } from 'node-fetch';
import { WasherStatus } from '../washer/WasherStatus';
import config from '../config';

let lastWasherStatus = 0;
const WASH_ENDED_STATUS = 7;

export const triggerIftttWebhookAfterEndLaundry = async (
  status: WasherStatus,
): Promise<Response | void> => {
  const washerStatus: number = Number(status.MachMd);
  if (washerStatus !== lastWasherStatus && washerStatus === WASH_ENDED_STATUS) {
    await triggerIftttWebhook('laundry_done');
  }
  lastWasherStatus = washerStatus;
};

const triggerIftttWebhook = async (
  eventName: string,
  value1?: string,
  value2?: string,
  value3?: string,
): Promise<Response> => {
  const url = `https://maker.ifttt.com/trigger/${eventName}/with/key/${config.iftttApiKey}`;
  return fetch(url, {
    method: 'POST',
    headers: { 'Context-Type': 'application/json' },
    body: JSON.stringify({
      value1,
      value2,
      value3,
    }),
  });
};
