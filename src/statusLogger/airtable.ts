import Airtable from 'airtable';
import config from '../config';
import { debug } from '../debug';
import { WasherStatus } from '../washer/WasherStatus';
import { StatusLogger } from './StatusLogger';

const airtable = new Airtable();
const base = airtable.base(config.airtableBaseName);

export const logCurrentStatus: StatusLogger = async (status: WasherStatus): Promise<void> => {
  debug.extend('airtable')(
    'Log current status to Airtable > %s > %s',
    config.airtableBaseName,
    config.airtableTableName,
  );
  base(config.airtableTableName).create(
    {
      ...status,
      createdAt: new Date(),
    },
    {
      typecast: true,
    },
  );
};
