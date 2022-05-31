import { ACTION_CLEAR_ALL_MODAL, ACTION_TOGGLE_MODAL } from './Modal.constant';

export const actionToggleModal = ({
    data = null,
    autoClearOnNewModal = false,
    closeable = false,
    customModalStyle = undefined,
    title = '',
    isLoadingModal = false,
    rightHeader = undefined,
}: {
    data?: any;
    autoClearOnNewModal?: boolean;
    closeable?: boolean;
    customModalStyle?: any;
    title?: string;
    isLoadingModal?: boolean;
    rightHeader?: any;
}) => ({
    type: ACTION_TOGGLE_MODAL,
    payload: { data, autoClearOnNewModal, closeable, customModalStyle, title, isLoadingModal, rightHeader },
});

export const actionClearAllModal = () => ({
    type: ACTION_CLEAR_ALL_MODAL,
});
