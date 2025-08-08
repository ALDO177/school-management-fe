import 'reflect-metadata';

import { DataSource } from 'typeorm';
import User from '../entity/Users';
import { EntityStudent } from '../entity/Students';
import { EntityHomeRoomTeacher } from '../entity/HomeRoomTeacher';
import { EntitySessionToken } from '@entity/SessionToken';
import EntityMasterClass from '@entity/MasterClass';
import EntityMastesStatus from '@entity/MasterStatusStudent';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  synchronize: process.env.NODE_ENV === "development" ? true : false ,
  logging: false,
  entities: [
      EntityHomeRoomTeacher, 
      EntityStudent, 
      User,
      EntitySessionToken,
      EntityMasterClass,
      EntityMastesStatus
  ]
});

let dataSourceInitialized: DataSource | null = null;

export async function getDataSource() {
  if (dataSourceInitialized && dataSourceInitialized.isInitialized) {
    return dataSourceInitialized;
  }

  dataSourceInitialized = await AppDataSource.initialize();
  return dataSourceInitialized;
}