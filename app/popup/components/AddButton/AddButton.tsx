import styled, { ITheme } from "styled-components";
import React from "react";

const Container = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP6};
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
`;

const Title = styled.p``;

interface AddButtonProps {
  onClick?: () => void;
}

export const AddButton = (props: AddButtonProps) => {
  const { onClick = () => {} } = props;
  return (
    <Container className="center hover-with-cursor" onClick={onClick}>
      <Title className="fs-meidum fw-meidum">+</Title>
    </Container>
  );
};
