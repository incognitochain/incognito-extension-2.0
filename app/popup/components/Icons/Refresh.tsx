import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 19px;
    height: 23px;
`;

const RefreshVector = React.memo((props: any) => {
    return (
        <svg width={18} height={22}>
            <path
                d="M9.38 21.295a8.604 8.604 0 008.624-8.643c0-.468-.332-.81-.81-.81-.46 0-.762.342-.762.81a7.033 7.033 0 01-7.051 7.07 7.042 7.042 0 01-7.06-7.07 7.031 7.031 0 017.06-7.05c.742 0 1.426.058 2.012.185l-2.92 2.9a.808.808 0 00-.225.557c0 .45.332.781.772.781.244 0 .43-.078.566-.224l4.023-4.043a.761.761 0 00.245-.586.837.837 0 00-.245-.586L9.586.504C9.449.348 9.254.27 9.02.27c-.44 0-.772.351-.772.8 0 .205.078.4.215.557l2.607 2.559a9.796 9.796 0 00-1.69-.157 8.602 8.602 0 00-8.632 8.623 8.613 8.613 0 008.633 8.643z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const Refresh = React.forwardRef((props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>, ref: any) => {
    return (
        <Styled ref={ref} className="icon" {...props}>
            <RefreshVector />
        </Styled>
    );
});

export default Refresh;
