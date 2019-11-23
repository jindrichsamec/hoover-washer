import Airtable from 'airtable'
import config from '../config';
import { WasherStatus } from '../washer/WasherStatus';

const airtable = new Airtable()
const base = airtable.base(config.airtableBaseName);

export const logCurrentStatus = async (status: WasherStatus) => {
  return base(config.airtableTableName).create(
      {
        ...status,
        createdAt: new Date(),
      },
      {
        typecast: true,
      },
    );
}
