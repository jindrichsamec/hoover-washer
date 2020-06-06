import fetch, { Response } from 'node-fetch';
import config from '../config';

export const setTemperature = (temperature: number): Promise<Response> => {
  return fetch(
    `http://${config.homebridgeHost}/?accessoryId=washWaterTemperature&value=${temperature}`,
  );
};
