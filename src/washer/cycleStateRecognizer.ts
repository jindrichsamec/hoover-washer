import { LaundryCycleState } from './LaundryCycleState';

let lastLaundryCycleState = LaundryCycleState.OFF;

export const hasCycleBeenEnded = (state: LaundryCycleState): boolean => {
  return hasCycleBeenChanged(state) && state === LaundryCycleState.ENDED;
};

export const hasCycleBeenExecuted = (state: LaundryCycleState): boolean => {
  return hasCycleBeenChanged(state) && state === LaundryCycleState.EXECUTION;
};

export const hasCycleBeenChanged = (
  currentLaundryCycleState: LaundryCycleState,
): boolean => {
  const prevLaundryCycleState = lastLaundryCycleState;
  lastLaundryCycleState = currentLaundryCycleState;
  return prevLaundryCycleState !== currentLaundryCycleState;
};
