import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 14px;
    height: 15px;
`;

const OpenLinkVector = React.memo((props: any) => {
    return (
        <svg width={14} height={15}>
            <path
                d="M1.059 13.158a.74.74 0 00.553-.237l8.728-8.719 1.45-1.643-.158 4.104v3.252c0 .413.36.8.79.8.423 0 .8-.36.8-.835l-.008-8.842c0-.5-.325-.852-.853-.852H3.52a.803.803 0 00-.827.8c0 .421.378.782.791.782h3.059l4.289-.141L9.197 3.06l-8.71 8.727a.8.8 0 00-.246.554c0 .422.378.817.818.817z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const OpenLink = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props}>
            <OpenLinkVector />
        </Styled>
    );
};

export default OpenLink;
