import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 17px;
    height: 17px;
`;

const ScanVector = React.memo((props: any) => {
    return (
        <svg width={17} height={17}>
            <path
                d="M15.703 5.86c.508 0 .781-.282.781-.79V3.172c0-1.672-.875-2.547-2.57-2.547h-1.898c-.508 0-.79.273-.79.781 0 .5.282.774.79.774h1.796c.711 0 1.118.375 1.118 1.132V5.07c0 .508.273.79.773.79zm-13.93 0c.508 0 .774-.282.774-.79V3.312c0-.757.398-1.132 1.117-1.132h1.797c.508 0 .789-.274.789-.774 0-.508-.281-.781-.79-.781H3.564c-1.688 0-2.57.867-2.57 2.547V5.07c0 .508.28.79.78.79zm3.688 10.257c.508 0 .789-.281.789-.781s-.281-.781-.79-.781H3.665c-.719 0-1.117-.367-1.117-1.125v-1.758c0-.508-.274-.79-.774-.79-.507 0-.78.282-.78.79v1.898c0 1.672.882 2.547 2.57 2.547H5.46zm8.453 0c1.695 0 2.57-.875 2.57-2.547v-1.898c0-.508-.28-.79-.78-.79-.509 0-.774.282-.774.79v1.758c0 .758-.407 1.125-1.117 1.125h-1.797c-.508 0-.79.28-.79.78s.282.782.79.782h1.898z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const Scan = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className = '' } = props;
    return (
        <Styled type="button" className={`icon ${className || ''}`} {...props}>
            <ScanVector />
        </Styled>
    );
};

export default Scan;
