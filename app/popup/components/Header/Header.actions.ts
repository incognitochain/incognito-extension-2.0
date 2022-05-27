import { ACTION_SET_REFRESH_PAGE } from './Header.constant';

export const actionSetRefreshPage = (payload: boolean) => ({
    type: ACTION_SET_REFRESH_PAGE,
    payload,
});
