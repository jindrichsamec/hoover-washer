import { RemoteInfo } from 'dgram';
import { debug } from '../debug';
import { fetchWasherStatus } from '../washer/fetchStatus';
import { WasherStatus } from '../washer/WasherStatus';
import { logCurrentStatus } from '../statusLogger/airtable';
import { displayWaterTemperature } from '../homebridge/waterTemperature';
import { triggerIftttWebhookAfterEndLaundry } from '../ifttt/webhook';

export const onMessage = async (msg: Buffer, rinfo: RemoteInfo) => {
  debug(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  try {
    const status: WasherStatus = await fetchWasherStatus(rinfo.address);
    displayWaterTemperature(status);
    triggerIftttWebhookAfterEndLaundry(status);
    const row = await logCurrentStatus(status);
    // @ts-ignore
    debug('Appliance status saved', row.id);
  } catch (err) {
    console.error(`ERROR during retrieving status. ${err.message}`);
  }
};
