export const ACTION_CREATE = '[addressBook] Action create receiver';
export const ACTION_UPDATE = '[addressBook] Action update receiver';
export const ACTION_DELETE = '[addressBook] Action delete receiver';
export const ACTION_SELECTED = '[addressBook] Selected receiver';
export const ACTION_REMOVE_SELECTED = '[addressBook] Remove selected receiver';

export const ADDRESS_BOOK_TYPE: {
    [x: string]: any;
} = {
    1: 'incognitoAddress',
    2: 'externalAddress',
};
