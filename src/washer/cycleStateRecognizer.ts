import { LaundryCycleState } from './LaundryCycleState';

export const hasCycleBeenEnded = (
  currentState: LaundryCycleState,
  prevState: LaundryCycleState,
): boolean => {
  return hasCycleBeenChangedTo(
    currentState,
    prevState,
    LaundryCycleState.ENDED,
  );
};

export const hasCycleBeenExecuted = (
  currentState: LaundryCycleState,
  prevState: LaundryCycleState,
): boolean => {
  return hasCycleBeenChangedTo(
    currentState,
    prevState,
    LaundryCycleState.EXECUTION,
  );
};

export const hasCycleBeenChangedTo = (
  currentState: LaundryCycleState,
  prevState: LaundryCycleState,
  requiredState: LaundryCycleState,
): boolean => {
  return currentState !== prevState && currentState === requiredState;
};
