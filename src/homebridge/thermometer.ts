import fetch, { Response } from 'node-fetch'

export const setTemperature = (temperature: number): Promise<Response> => {
  return fetch(
    `http://raspberrypi.local:51828/?accessoryId=washWaterTemperature&value=${temperature}`
  );
};
