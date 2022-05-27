import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 18px;
    height: 10px;
`;

const ArrowDownVector = React.memo((props: any) => {
    return (
        <svg width={16} height={10}>
            <path
                d="M7.879 9.339c.22 0 .44-.088.589-.255l6.803-6.97a.784.784 0 00.237-.562.788.788 0 00-.8-.809.835.835 0 00-.571.229L7.879 7.37 1.612.972a.803.803 0 00-.571-.229c-.457 0-.8.352-.8.809 0 .22.088.413.238.571L7.28 9.084c.167.167.37.255.598.255z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const ArrowDown = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon arrow-down-icon" {...props}>
            <ArrowDownVector />
        </Styled>
    );
};

export default ArrowDown;
