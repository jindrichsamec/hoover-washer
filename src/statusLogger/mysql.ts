import mysql from 'mysql';
import config from '../config';
import { WasherStatus } from '../washer/WasherStatus';
import { StatusLogger } from './StatusLogger';
import { debug } from '../debug';

let connection: mysql.Connection | null = null;

type SupportedJsTypes = 'string' | 'number' | 'boolean';

const jsToMysqlTypeMap: Record<SupportedJsTypes, string> = {
  string: "VARCHAR(255) NOT NULL DEFAULT ''",
  number: 'INT(8) NOT NULL DEFAULT 0',
  boolean: 'TINYINT(1) NOT NULL DEFAULT 0',
};

const getConnection = (): mysql.Connection => {
  if (connection === null) {
    connection = mysql.createConnection(config.mysql);
    connection.connect();
  }
  return connection;
};

export const logCurrentStatus: StatusLogger = async (
  status: WasherStatus,
): Promise<void> => {
  const columnDefinitions: Array<string> = Object.keys(status).map(
    (key: string): string => {
      const columnName: keyof WasherStatus = key as keyof WasherStatus;
      const columnType: string = typeof status[columnName];

      const columnDefinition: string = jsToMysqlTypeMap.hasOwnProperty(
        columnType,
      )
        ? jsToMysqlTypeMap[columnType as SupportedJsTypes]
        : jsToMysqlTypeMap.string;
      return `${columnName} ${columnDefinition}`;
    },
  );
  columnDefinitions.push('id int primary key auto_increment');
  columnDefinitions.push(
    'createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
  );
  const sql = `CREATE TABLE IF NOT EXISTS hoover_status (${columnDefinitions.join(
    ', ',
  )})`;

  debug.extend('mysql')('SQL', sql);
  getConnection().query(sql);
  getConnection().query('INSERT INTO hoover_status SET ?', status);
};
