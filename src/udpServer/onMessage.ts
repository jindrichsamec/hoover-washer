import { RemoteInfo } from 'dgram';
import { debug } from '../debug';
import { fetchWasherStatus } from '../washer/fetchStatus';
import { WasherStatus } from '../washer/WasherStatus';
import { logCurrentStatus } from '../statusLogger/airtable';
import { displayWaterTemperature } from '../homebridge/waterTemperature';
import { triggerIftttWebhookAfterEndLaundry } from '../ifttt/webhook';

export const onMessage = async (msg: Buffer, rinfo: RemoteInfo) => {
  debug.extend('onMessage')(
    `server got: ${msg} from ${rinfo.address}:${rinfo.port}`,
  );
  try {
    const status: WasherStatus = await fetchWasherStatus(rinfo.address);
    const jobs = await Promise.all([
      displayWaterTemperature(status),
      triggerIftttWebhookAfterEndLaundry(status),
      logCurrentStatus(status),
    ]);
    debug.extend('onMessage')(
      'Washer status was processed by %s jobs',
      jobs.length,
    );
  } catch (err) {
    debug.extend('onMessage')(
      `ERROR during processing washer status. ${err.message}`,
    );
  }
};
