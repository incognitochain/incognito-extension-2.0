import React from "react";
import styled, { ITheme } from "styled-components";

interface IProps {}

const Styled = styled.button`
  padding: 8px;
  background: ${({ theme }: { theme: ITheme }) => theme.content};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchVector = React.memo((props: any) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m21.63 19.241-3.29-3.284a.409.409 0 0 1-.06-.518 8.744 8.744 0 0 0 1.225-6.126 8.768 8.768 0 0 0-3.178-5.384 8.84 8.84 0 0 0-11.709.605 8.75 8.75 0 0 0-.746 11.65 8.821 8.821 0 0 0 5.371 3.226 8.847 8.847 0 0 0 6.167-1.147.413.413 0 0 1 .52.059l3.3 3.276a1.684 1.684 0 0 0 2.278-.088 1.668 1.668 0 0 0 .088-2.269h.034Zm-10.837-1.329a7.157 7.157 0 0 1-3.964-1.197A7.11 7.11 0 0 1 4.2 13.527a7.075 7.075 0 0 1 1.546-7.742 7.164 7.164 0 0 1 7.776-1.54 7.128 7.128 0 0 1 3.203 2.617 7.082 7.082 0 0 1 1.202 3.947 7.096 7.096 0 0 1-2.092 5.02 7.16 7.16 0 0 1-5.043 2.083Z"
        fill="#fff"
      />
    </svg>
  );
});

const Search = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className = "" } = props;
  return (
    <Styled type="button" className={`icon ${className || ""}`} {...props}>
      <SearchVector />
    </Styled>
  );
};

export default Search;
