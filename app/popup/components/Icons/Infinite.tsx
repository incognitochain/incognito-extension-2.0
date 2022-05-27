import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 20px;
    height: 11px;
`;

const InfiniteVector = React.memo((props: any) => {
    return (
        <svg width={20} height={11}>
            <path
                d="M15.53 9.216c2.557 0 4.285-1.78 4.285-4.504 0-2.725-1.728-4.504-4.284-4.504-1.34 0-2.49.563-3.72 1.757L10.06 3.65 8.316 1.965C7.086.771 5.936.208 4.596.208 2.04.208.31 1.988.31 4.712c0 2.725 1.729 4.504 4.285 4.504 1.34 0 2.49-.571 3.72-1.758l1.744-1.691 1.75 1.691c1.23 1.187 2.38 1.758 3.72 1.758zM4.597 7.656C2.977 7.656 1.87 6.5 1.87 4.712c0-1.795 1.106-2.944 2.725-2.944.893 0 1.699.432 2.63 1.303l1.742 1.64-1.75 1.642c-.923.871-1.729 1.303-2.622 1.303zm10.935 0c-.894 0-1.7-.432-2.622-1.303l-1.75-1.641 1.742-1.64c.93-.872 1.729-1.304 2.63-1.304 1.618 0 2.724 1.15 2.724 2.944 0 1.787-1.106 2.944-2.724 2.944z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const Infinite = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className = '' } = props;
    return (
        <Styled type="button" className={`icon ${className || ''}`} {...props}>
            <InfiniteVector />
        </Styled>
    );
};

export default Infinite;
