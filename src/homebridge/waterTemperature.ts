import { setTemperature } from './thermometer';
import { WasherStatus } from '../washer/WasherStatus';

let lastWasherStatus = 0;
const WASH_ENDED_STATUS = 7;
const WASHER_EXECUTION_STATUS = 2;

export function displayWaterTemperature(status: WasherStatus): void {
  const washerStatus: number = Number(status.MachMd);
  if (washerStatus !== lastWasherStatus) {
    if (washerStatus === WASH_ENDED_STATUS) {
      setTemperature(-100);
      console.log('Switch was turned off');
    }
    if (washerStatus === WASHER_EXECUTION_STATUS) {
      setTemperature(Number(status.Temp));
      console.log('Switch was turned on');
    }
    lastWasherStatus = washerStatus;
  }
}
