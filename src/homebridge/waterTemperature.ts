import { debug } from '../debug';
import { setTemperature } from './thermometer';
import { WasherStatus } from '../washer/WasherStatus';
import {
  hasCycleBeenExecuted,
  hasCycleBeenEnded,
} from '../washer/cycleStateRecognizer';
import { LaundryCycleState } from '../washer/LaundryCycleState';

let lastLaundryCycleState = LaundryCycleState.OFF;

export function displayWaterTemperature(status: WasherStatus): void {
  const cycleState: number = Number(status.MachMd);
  if (hasCycleBeenExecuted(cycleState, lastLaundryCycleState)) {
    debug.extend('homebridge')('Switch was turned on');
    setTemperature(Number(status.Temp));
  } else if (hasCycleBeenEnded(cycleState, lastLaundryCycleState)) {
    debug.extend('homebridge')('Switch was turned off');
    setTemperature(-100);
  }
  lastLaundryCycleState = cycleState;
}
