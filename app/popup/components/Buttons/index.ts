import styled, { ITheme } from "styled-components";

const PrimaryButton = styled.button`
  color: ${({ theme }: { theme: ITheme }) => "white"};
  background: ${({ theme }: { theme: ITheme }) => "#1A73E8"};
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 10px;
  width: 100%;
  height: 50px;
  border-radius: 8px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  text-align: center;
  letter-spacing: -0.02em;

  /* Primary/White */

  color: #ffffff;

  :hover {
    outline: none !important;
    opacity: 0.9;
  }
  :disabled {
    background-color: #c0c0c0;
    color: #ffffff;
    :hover {
      opacity: 1;
    }
  }
`;

const SecondaryButton = styled.button`
  color: ${({ theme }: { theme: ITheme }) => "#1A73E8"};
  background: ${({ theme }: { theme: ITheme }) => "white"};
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 10px;
  width: 100%;
  height: 50px;
  border-radius: 8px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */

  text-align: center;
  letter-spacing: -0.02em;

  :hover {
    outline: none !important;
    opacity: 0.9;
  }

  :disabled {
    background-color: #c0c0c0;
    color: #ffffff;
    :hover {
      opacity: 1;
    }
  }
`;

export { PrimaryButton, SecondaryButton };
