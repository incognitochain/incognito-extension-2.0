import { ACTION_FETCHED, ACTION_CHANGE_LANGUAGE } from './Configs.constant';

export const actionFetched = (payload: any) => ({
    type: ACTION_FETCHED,
    payload,
});

export const actionChangeLanguage = (language: string) => ({
    type: ACTION_CHANGE_LANGUAGE,
    payload: language,
});
