import * as yup from 'yup';
import { laundryCycleStateValues } from './LaundryCycleState';

export const validationSchema = yup.object().shape({
  WiFiStatus: yup.boolean(), // remote control enabled
  Err: yup.number().integer(),
  MachMd: yup.number().oneOf(laundryCycleStateValues),
  Pr: yup.number().integer(), // Program
  PrPh: yup.number().integer(), // Program phase
  /*
    public static final int WasherPhaseDrying = 6;
    public static final int WasherPhaseEndMode = 5;
    public static final int WasherPhaseErrorMode = 7;
    public static final int WasherPhaseGnPause = 9;
    public static final int WasherPhaseLastRinse = 4;
    public static final int WasherPhaseNoPhase = 0;
    public static final int WasherPhaseNonApplicable = 255;
    public static final int WasherPhasePreWash = 1;
    public static final int WasherPhaseRinse = 3;
    public static final int WasherPhaseWash = 2;
*/
  PrCode: yup.number().integer(), // Program code
  SLevel: yup.number().integer(), // soil level
  Temp: yup.number().integer(), // water temperature
  SpinSp: yup.number().integer(), // spin speed value * 1000
  Steam: yup.number().integer(), // steam on/off
  DryT: yup.number().integer(), // dryer on/off
  DelVal: yup.number().integer(), // delayed start
  RemTime: yup.number().integer(), // remaining time
  RecipeId: yup.string(),
  Lang: yup.number().integer(),
  FillR: yup.number().integer(), // fill percentage
  DisTestOn: yup.boolean(),
  DisTestRes: yup.boolean(),
  CheckUpState: yup.number().integer(),
  Det: yup.boolean(), // Detergent (bool)
  Soft: yup.boolean(), // Softener (bool)
  DetWarn: yup.boolean(), // Detergent warning (bool)
  SoftWarn: yup.boolean(),
  DetPreW: yup.boolean(),
  SoftPreW: yup.boolean(),
  DPrgCnt: yup.number().integer(),
  SPrgCnt: yup.number().integer(),
  WaterHard: yup.number().integer(),
  rED: yup.number().integer(),
  T0W: yup.number().integer(), // 0 water??
  TIW: yup.number().integer(), // 1. water
  T0R: yup.number().integer(),
  numF: yup.number().integer(), // Water filling number
  unbF: yup.number().integer(), // unbalance factor
  unbC: yup.number().integer(), // unbalance compensation
  NtcW: yup.number().integer(), // NTW Wash value
  NtcD: yup.number().integer(), // NTW Dry value
  motS: yup.number().integer(), // motor speed value
  APSoff: yup.number().integer(), // APS offset
  APSfreq: yup.number().integer(), // APS frequency
  chartL: yup.number().integer(), // chart line
});

export type WasherStatus = yup.InferType<typeof validationSchema>;
