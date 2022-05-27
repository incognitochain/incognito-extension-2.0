import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 11px;
    height: 11px;
`;

const CloseVector = React.memo((props: any) => {
    return (
        <svg width={11} height={11} viewBox="0 0 11 11">
            <path
                d="M10.521 10.292a.575.575 0 000-.8L6.458 5.423l4.063-4.062a.569.569 0 00-.806-.8L5.652 4.624 1.59.56a.565.565 0 00-.806 0 .575.575 0 000 .8l4.062 4.062-4.062 4.07a.569.569 0 000 .799c.222.216.59.216.806 0l4.062-4.063 4.063 4.063c.216.216.59.222.806 0z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const Close = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon close-icon" {...props}>
            <CloseVector />
        </Styled>
    );
};

export default Close;
