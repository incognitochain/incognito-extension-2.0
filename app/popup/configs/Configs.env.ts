import isEmpty from 'lodash/isEmpty';

interface IENVS {
  REACT_APP_IS_MAINNET: boolean;
  REACT_APP_VERSION: string;
  REACT_APP_DOMAIN_URL: string;
  REACT_APP_COIN_SERVICE_URL: string;
  REACT_APP_SERVICE_URL: string;
}

const defaultEnvs = {
  REACT_APP_IS_MAINNET: false,
  REACT_APP_VERSION: '1.0',
  REACT_APP_DOMAIN_URL: '',
  REACT_APP_COIN_SERVICE_URL: '',
  REACT_APP_SERVICE_URL: '',
};

export const getEnvs = () => {
  let envs: any = {};
  try {
    const PROCCESS_ENV = process.env;
    if (!isEmpty(PROCCESS_ENV)) {
      Object.keys(PROCCESS_ENV).forEach((key: string) => {
        const value = PROCCESS_ENV[key];
        if (value === 'true' || value === 'false') {
          envs[key] = value === 'true';
        } else {
          envs[key] = PROCCESS_ENV[key];
        }
        return key;
      });
    }
  } catch (error) {
    console.debug(error);
  } finally {
    envs = isEmpty(envs) ? defaultEnvs : envs;
  }
  return { ...envs, REACT_APP_DOMAIN_URL: window.location.origin };
};

export const ENVS: IENVS = getEnvs();

export const isMainnet: boolean = ENVS.REACT_APP_IS_MAINNET;
export const appDomain: string = ENVS.REACT_APP_DOMAIN_URL;
