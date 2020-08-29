import SheetsAPI from 'sheets-api';
import config from '../config';
import { debug } from '../debug';
import { WasherStatus } from '../washer/WasherStatus';
import { StatusLogger } from './StatusLogger';

const sheets = new SheetsAPI();

export const logCurrentStatus: StatusLogger = async (
  status: WasherStatus,
): Promise<void> => {
  debug.extend('google:sheets')(
    'Log current status to Google spreadsheet > %s',
    config.googleSheetsSpreadsheetId,
  );
  const rowToSave = {
    created: new Date().toLocaleString(),
    ...status,
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

  const data = await sheets.values('get', client, {
    spreadsheetId: config.googleSheetsSpreadsheetId,
    range: 'A1',
  });

  if (data.response.values === undefined) {
    debug.extend('google:sheets')('Initializing empty sheet');
    await sheets.values(
      'append',
      client,
      createRowPayload(Object.keys(rowToSave)),
    );
  }

  sheets.values(
    'append',
    client,
    createRowPayload(Object.values(rowToSave)),
  );
};

function createRowPayload(rowToSave: Array<string | number | boolean>): Object {
  return {
    spreadsheetId: config.googleSheetsSpreadsheetId,
    range: 'A1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      majorDimension: 'ROWS',
      values: [rowToSave],
    },
  };
}
