import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 16px;
    height: 18px;
`;

const AddressBookVector = React.memo((props: any) => {
    return (
        <svg width={16} height={18}>
            <path
                d="M7.976 8.848c2.127 0 3.85-1.881 3.85-4.184 0-2.268-1.723-4.07-3.85-4.07-2.119 0-3.859 1.829-3.85 4.088.009 2.294 1.723 4.166 3.85 4.166zm0-1.538c-1.213 0-2.242-1.152-2.242-2.628-.008-1.442 1.02-2.55 2.242-2.55 1.23 0 2.24 1.09 2.24 2.532 0 1.477-1.019 2.646-2.24 2.646zm5.475 9.711c1.52 0 2.25-.483 2.25-1.52 0-2.417-3.014-5.634-7.725-5.634S.24 13.084.24 15.501c0 1.037.73 1.52 2.25 1.52h10.96zm.273-1.538H2.219c-.211 0-.29-.07-.29-.228 0-1.345 2.17-3.85 6.047-3.85 3.867 0 6.038 2.505 6.038 3.85 0 .158-.08.228-.29.228z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const AddressBook = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className = '' } = props;
    return (
        <Styled type="button" className={`icon ${className || ''}`} {...props}>
            <AddressBookVector />
        </Styled>
    );
};

export default AddressBook;
