import { EnvironmentHmr } from './environment-hmr';

export interface Environment {
  isProduction: boolean;
  hmr: EnvironmentHmr;
}
