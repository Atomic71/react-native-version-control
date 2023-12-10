import type { Database } from './index.types';
export { type Database } from './index.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export type AppVersion = Tables<'app_versions'>;

type RelevantAppVersionInfo = Omit<AppVersion, 'created_at' | 'updated_at'>;
export type CreateAppVersionPayload = Omit<RelevantAppVersionInfo, 'id'>;
export type UpdateAppVersionPayload = RelevantAppVersionInfo;

export type App = Tables<'apps'>;
export type CreateAppPayload = Pick<App, 'name'>;
