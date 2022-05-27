import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    min-width: 13px;
    height: 15px;
`;

const TrashVector = React.memo((props: any) => {
    return (
        <svg width="1em" height="1em" viewBox="0 0 18 20" {...props}>
            <path
                d="M12.887 19.663c1.257 0 2.1-.817 2.162-2.074l.606-12.78h1.055c.36 0 .66-.307.66-.667 0-.36-.3-.66-.66-.66h-4.017V2.138c0-1.275-.826-2.048-2.18-2.048h-3.33c-1.354 0-2.18.773-2.18 2.048v1.344h-4a.67.67 0 00-.658.66c0 .369.307.668.659.668h1.055l.606 12.788c.062 1.256.897 2.065 2.162 2.065h8.06zm-1.591-16.18H6.4V2.225c0-.501.343-.827.87-.827h3.156c.527 0 .87.326.87.827v1.256zm1.45 14.853H4.95c-.5 0-.879-.378-.905-.897L3.43 4.81h10.81l-.571 12.63c-.026.528-.404.897-.923.897zm-6.495-1.503c.334 0 .554-.21.545-.519L6.532 6.91c-.009-.307-.237-.51-.553-.51-.334 0-.554.211-.545.519l.272 9.395c.009.317.22.519.545.519zm2.61 0c.334 0 .563-.21.563-.519V6.92c0-.308-.229-.519-.563-.519-.334 0-.571.211-.571.519v9.395c0 .308.237.519.571.519zm2.602 0c.316 0 .536-.202.545-.519l.272-9.395c.01-.308-.22-.519-.553-.519-.308 0-.537.203-.545.519l-.264 9.395c-.009.308.21.519.545.519z"
                fill="#8A8A8E"
                fillRule="nonzero"
            />
        </svg>
    );
});

const TrashBin = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon trash-bin-icon" {...props}>
            <TrashVector />
        </Styled>
    );
};

export default TrashBin;
