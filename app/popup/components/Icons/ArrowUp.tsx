import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 18px;
    height: 10px;
`;

const ArrowUpVector = React.memo((props: any) => {
    return (
        <svg width={16} height={10}>
            <path
                d="M14.708 8.6c.457 0 .8-.342.8-.8a.775.775 0 00-.237-.57L8.468.268a.8.8 0 00-1.187 0L.48 7.229a.775.775 0 00-.238.572c0 .457.343.8.8.8.229 0 .44-.08.571-.229L7.88 1.974l6.258 6.398c.14.15.351.229.571.229z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const ArrowUp = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon arrow-up-icon" {...props}>
            <ArrowUpVector />
        </Styled>
    );
};

export default ArrowUp;
