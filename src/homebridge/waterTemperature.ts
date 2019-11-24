import { debug } from '../debug';
import { setTemperature } from './thermometer';
import { WasherStatus } from '../washer/WasherStatus';
import {
  hasCycleBeenExecuted,
  hasCycleBeenEnded,
} from '../washer/cycleStateRecognizer';

export function displayWaterTemperature(status: WasherStatus): void {
  const cycleState: number = Number(status.MachMd);
  if (hasCycleBeenExecuted(cycleState)) {
    debug.extend('homebridge')('Switch was turned on');
    setTemperature(Number(status.Temp));
  } else if (hasCycleBeenEnded(cycleState)) {
    debug.extend('homebridge')('Switch was turned off');
    setTemperature(-100);
  }
}
