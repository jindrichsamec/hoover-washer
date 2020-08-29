import { WasherStatus } from "../washer/WasherStatus";

export type StatusLogger = (status: WasherStatus) => Promise<void>
