import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 19px;
    height: 19px;
`;

const AddCircleVector = React.memo((props: any) => {
    return (
        <svg width={19} height={19}>
            <path
                d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zm-.017-4.738c-.449 0-.756-.325-.756-.774V10.41H6.084c-.457 0-.782-.299-.782-.747 0-.457.316-.773.782-.773h2.68V6.2c0-.457.308-.782.757-.782.457 0 .773.325.773.782v2.69h2.698c.448 0 .765.316.765.773 0 .448-.317.747-.765.747h-2.698v2.698c0 .449-.316.774-.773.774z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const AddCircle = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props}>
            <AddCircleVector />
        </Styled>
    );
};

export default AddCircle;
