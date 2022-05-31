import React from 'react';
import { useDispatch } from 'react-redux';
import { IProps } from './Modal.interface';
import { actionToggleModal } from './Modal.actions';

const enhance = (WrappedComponent: React.FunctionComponent<IProps>) => (props: IProps) => {
    const dispatch = useDispatch();
    const handleClose = () => dispatch(actionToggleModal({}));
    return <WrappedComponent {...props} onClose={handleClose} />;
};

export default enhance;
