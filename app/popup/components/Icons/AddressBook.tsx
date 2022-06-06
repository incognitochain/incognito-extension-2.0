import React from "react";
import styled from "styled-components";

interface IProps {}

const Styled = styled.button`
  width: 24px;
  height: 24px;
`;

const AddressBookVector = React.memo((props: any) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.578 11.774a4.387 4.387 0 1 0 0-8.774 4.387 4.387 0 0 0 0 8.774Zm0 1.196A7.586 7.586 0 0 0 4 20.55a.399.399 0 0 0 .399.398h14.358a.399.399 0 0 0 .399-.398 7.586 7.586 0 0 0-7.578-7.578Z"
        fill="#fff"
        {...props}
      />
    </svg>
  );
});

const AddressBook = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className = "" } = props;
  return (
    <Styled type="button" className={`icon ${className || ""}`} {...props}>
      <AddressBookVector />
    </Styled>
  );
};

export default AddressBook;
