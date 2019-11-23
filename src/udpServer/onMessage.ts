import { RemoteInfo } from 'dgram';
import { fetchWasherStatus } from '../washer/fetchStatus';
import { WasherStatus } from '../washer/WasherStatus';
import { logCurrentStatus } from '../statusLogger/airtable';
import { displayWaterTemperature } from '../homebridge/waterTemperature';
import { triggerIftttWebhookAfterEndLaundry } from '../ifttt/webhook';

export const onMessage = async (msg: Buffer, rinfo: RemoteInfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  try {
    const status: WasherStatus = await fetchWasherStatus(rinfo.address);
    displayWaterTemperature(status);
    triggerIftttWebhookAfterEndLaundry(status);
    const row = await logCurrentStatus(status);
    // @ts-ignore
    console.log('Appliance status saved', row.id);
  } catch (err) {
    console.error(`Error during retrieving status. ${err.message}`);
  }
};
