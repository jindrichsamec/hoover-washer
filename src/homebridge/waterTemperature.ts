import { setTemperature } from './thermometer';
import { WasherStatus } from '../washer/WasherStatus';
import {
  hasCycleBeenExecuted,
  hasCycleBeenEnded,
} from '../washer/cycleStateRecognizer';

export function displayWaterTemperature(status: WasherStatus): void {
  const cycleState: number = Number(status.MachMd);
  if (hasCycleBeenExecuted(cycleState)) {
    console.log('Switch was turned on');
    setTemperature(Number(status.Temp));
  } else if (hasCycleBeenEnded(cycleState)) {
    console.log('Switch was turned off');
    setTemperature(-100);
  }
}
