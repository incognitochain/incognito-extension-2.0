import { ACTION_SET_REFRESH_PAGE } from './Header.constant';
import { IHeaderReducer } from './Header.interface';

const initialState: IHeaderReducer = {
    refresh: false,
};

const headerReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_SET_REFRESH_PAGE: {
            return {
                ...state,
                refresh: !!action.payload,
            };
        }
        default:
            return state;
    }
};

export default headerReducer;
