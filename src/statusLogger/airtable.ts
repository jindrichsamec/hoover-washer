import Airtable from 'airtable';
import config from '../config';
import { debug } from '../debug';
import { WasherStatus } from '../washer/WasherStatus';

const airtable = new Airtable();
const base = airtable.base(config.airtableBaseName);

export const logCurrentStatus = async (status: WasherStatus) => {
  debug.extend('airtable')(
    'Log current status to Airtable > %s > %s',
    config.airtableBaseName,
    config.airtableTableName,
  );
  return base(config.airtableTableName).create(
    {
      ...status,
      createdAt: new Date(),
    },
    {
      typecast: true,
    },
  );
};
