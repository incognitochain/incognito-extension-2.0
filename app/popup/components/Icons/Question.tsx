import React from 'react';
import styled from 'styled-components';

interface IProps {
    width?: number;
    height?: number;
}

const Styled = styled.button<{ width?: number; height?: number }>`
    width: ${(props) => (props?.width ? `${props?.width}px` : `15px`)};
    height: ${(props) => (props?.height ? `${props?.height}px` : `15px`)};
`;

const QuestionVector = React.memo((props: any) => {
    return (
        <svg width={15} height={15} viewBox="0 0 14 14">
            <path
                d="M6.61 13.892c3.543 0 6.475-2.94 6.475-6.475 0-3.542-2.939-6.475-6.48-6.475C3.068.942.135 3.875.135 7.417c0 3.536 2.94 6.475 6.475 6.475zm-.139-5.117c-.336 0-.527-.177-.527-.52v-.083c0-.647.356-.99.826-1.32.57-.4.844-.616.844-1.06 0-.495-.387-.832-.978-.832-.438 0-.749.216-.965.572-.215.247-.273.444-.647.444a.448.448 0 01-.457-.45c0-.109.032-.223.063-.324.178-.603.914-1.13 2.044-1.13 1.118 0 2.089.577 2.089 1.67 0 .786-.457 1.167-1.092 1.586-.457.298-.667.533-.667.901v.077c0 .26-.203.47-.533.47zm-.013 1.95c-.38 0-.71-.306-.71-.68 0-.375.323-.686.71-.686.388 0 .711.305.711.686 0 .38-.33.68-.71.68z"
                fill="#FFF"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const Question = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props}>
            <QuestionVector />
        </Styled>
    );
};

export default Question;
