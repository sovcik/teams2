import {
  EventDataSource,
  EventTeamDataSource,
  FileDataSource,
  InvoiceDataSource,
  ProgramDataSource,
  TagDataSource,
  TeamDataSource,
  UserDataSource,
} from './datasources';
import { UserData } from '../models';
import { ObjectId } from 'mongodb';

export interface AuthProfileData {
  email: string;
}

export const apolloContextEmpty: ApolloContext = {
  user: null,
  userTimeZone: 'Europe/Bratislava',
};

export type ApolloContextDataSources = {
  user: UserDataSource;
  event: EventDataSource;
  eventTeam: EventTeamDataSource;
  team: TeamDataSource;
  program: ProgramDataSource;
  invoice: InvoiceDataSource;
  file: FileDataSource;
  tag: TagDataSource;
};

interface UserDataExtended extends UserData {
  isUser: (userId: ObjectId) => boolean;
  isProgramManagerOf: (programId: ObjectId) => boolean;
  isEventManagerOf: (eventId: ObjectId) => boolean;
  isCoachOf: (teamId: ObjectId) => boolean;
}

export interface ApolloContext {
  user: Omit<UserDataExtended, 'password'> | null;
  userTimeZone: string;
  dataSources?: ApolloContextDataSources;
  authProfileData?: AuthProfileData;
}
