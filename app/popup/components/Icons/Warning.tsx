import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    min-width: 18px;
    height: 18px;
`;

const WarningVector = React.memo((props: any) => {
    return (
        <svg width="1em" height="1em" viewBox="0 0 16 15" {...props}>
            <path
                d="M13.788 14.633c1.098 0 1.787-.79 1.787-1.787 0-.3-.074-.6-.235-.879L9.576 1.677a1.763 1.763 0 00-3.083 0L.736 11.975a1.798 1.798 0 00-.242.871c0 .996.689 1.787 1.787 1.787h11.507zm-5.75-4.892c-.38 0-.586-.22-.593-.608l-.103-3.985c-.007-.388.279-.666.689-.666.403 0 .703.286.696.674l-.103 3.977c-.007.395-.22.608-.586.608zm0 2.453c-.432 0-.813-.351-.813-.783 0-.44.374-.791.813-.791.447 0 .82.344.82.79 0 .44-.38.784-.82.784z"
                fill="#000"
                fillRule="nonzero"
            />
        </svg>
    );
});

const Warning = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon waring-icon" {...props}>
            <WarningVector />
        </Styled>
    );
};

export default React.memo(Warning);
