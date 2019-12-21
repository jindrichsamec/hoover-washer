import SheetsAPI from 'sheets-api';
import config from '../config';
import { debug } from '../debug';
import { WasherStatus } from '../washer/WasherStatus';

const sheets = new SheetsAPI();

export const logCurrentStatus = async (status: WasherStatus) => {
  debug.extend('google:sheets')(
    'Log current status to Google spreadsheet > %s',
    config.googleSheetsClientId,
  );

  const payload = {
    spreadsheetId: config.googleSheetsSpreadsheetId,
    range: 'A1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      majorDimension: 'ROWS',
      values: [[...Object.values(status), new Date()]],
    },
  };
  const client = await sheets._authorize({
    installed: {
      client_id: config.googleSheetsClientId,
      project_id: config.googleSheetsProjectId,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_secret: config.googleSheetsClientSecret,
      redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost'],
    },
  });
  return sheets.values('append', client, payload);
};
