import { ACTION_CHANGE_LANGUAGE } from './Configs.constant';

export interface IConfigsReducer {
    language: string;
}

const initialState: IConfigsReducer = {
    language: 'en',
};

const reducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_CHANGE_LANGUAGE: {
            return {
                ...state,
                language: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
