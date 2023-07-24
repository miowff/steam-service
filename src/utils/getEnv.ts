import { EnvVariables } from "../enums/envs";

export const getEnv = (envName: EnvVariables) => {
  return process.env[envName];
};
