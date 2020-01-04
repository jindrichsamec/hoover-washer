export enum LaundryCycleState {
  OFF = 0,
  SELECTION = 1,
  EXECUTION = 2,
  PAUSE = 3,
  DELAY_START = 4,
  ERROR = 6,
  ENDED = 7,
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
