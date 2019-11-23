require('dotenv').config();

const getEnv = (envVariableName: string, defaultValue?: string): string => {
  const value = process.env[envVariableName] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing configuration ${envVariableName}`)
  }
  return value;
}

export default {
  udpServerPort: Number(getEnv('UDP_SERVER_PORT')),
  airtableBaseName: getEnv('AIRTABLE_BASE_NAME'),
  airtableTableName: getEnv('AIRTABLE_TABLE_NAME'),
  airtableApiKey: getEnv('AIRTABLE_API_KEY')
};