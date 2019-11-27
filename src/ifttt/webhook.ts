import fetch, { Response } from 'node-fetch';
import { debug } from '../debug';
import { WasherStatus } from '../washer/WasherStatus';
import config from '../config';
import { hasCycleBeenEnded } from '../washer/cycleStateRecognizer';
import { LaundryCycleState } from '../washer/LaundryCycleState';

let lastLaundryCycleState = LaundryCycleState.OFF;

export const triggerIftttWebhookAfterEndLaundry = async (
  status: WasherStatus,
): Promise<void> => {
  const cycleSate: LaundryCycleState = Number(status.MachMd);
  if (hasCycleBeenEnded(cycleSate, lastLaundryCycleState)) {
    debug.extend('ifttt')('triggering ifttt webhook service');
    await triggerIftttWebhook('laundry_done');
  }
  lastLaundryCycleState = cycleSate;
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
