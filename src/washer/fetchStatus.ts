import fetch from 'node-fetch';
import { WasherStatus } from './WasherStatus'

export const fetchWasherStatus = async (hostname: string): Promise<WasherStatus> => {
  const response = await fetch(
      `http://${hostname}/http-read.json?encrypted=0`,
    );
    const data = await response.json();
    return data.statusLavatrice
}
