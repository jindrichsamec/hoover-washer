export enum LaundryCycleState {
  OFF = 0,
  PROGRAM_SELECTION = 1,
  PROGRAM_EXECUTION = 2,
  PROGRAM_PAUSE = 3,
  DELAYED_START_SELECTION = 4,
  DELAYED_START_EXECUTED = 5,
  ERROR = 6,
  PROGRAM_ENDED = 7,
}
export const laundryCycleStateKeys: Array<string> = Object.keys(
  LaundryCycleState,
).filter(k => typeof LaundryCycleState[k as any] === 'number');

export const laundryCycleStateValues: Array<number> = laundryCycleStateKeys
  .map(k => {
    const value = LaundryCycleState[k as any];
    return typeof value === 'number' ? value : NaN;
  })
  .filter(v => !isNaN(v));
