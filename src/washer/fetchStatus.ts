import fetch from 'node-fetch';
import { WasherStatus, validationSchema } from './WasherStatus';

export const fetchWasherStatus = async (
  hostname: string,
): Promise<WasherStatus> => {
  const response = await fetch(`http://${hostname}/http-read.json?encrypted=0`);
  const data = await response.json();
  return validationSchema.validate(data?.statusLavatrice, {
    stripUnknown: true,
  });
};
