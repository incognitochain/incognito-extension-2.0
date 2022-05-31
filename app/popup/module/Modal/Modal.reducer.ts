import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import { ACTION_TOGGLE_MODAL, ACTION_TOGGLE_LOADING_MODAL, ACTION_CLEAR_ALL_MODAL } from './Modal.constant';

export interface IModalReducer {
    data: Array<any>;
}

const initialState: IModalReducer = {
    data: [],
};

const reducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_TOGGLE_MODAL: {
            let { data: modals } = state;
            const currentModal = last(modals);
            const modal = action.payload;
            if (currentModal && currentModal.autoClearOnNewModal) {
                modals = modals.slice(0, modals.length - 1);
            }
            const newData =
                isEmpty(modal) || isEmpty(modal.data) ? [...modals.slice(0, modals.length - 1)] : [...modals, modal];
            return {
                ...state,
                ...action.payload,
                data: newData,
            };
        }
        case ACTION_TOGGLE_LOADING_MODAL: {
            return {
                ...state,
            };
        }
        case ACTION_CLEAR_ALL_MODAL: {
            return {
                ...state,
                data: [],
            };
        }
        default:
            return state;
    }
};

export default reducer;
