import React, { useContext, useMemo, useState } from "react";
import styled, { ITheme } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP6};
  opacity: 0.9;
`;

const AnimationLoading = styled.div`
  border: 5px solid ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  border-radius: 50%;
  border-top: 5px solid #63b8ff;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => (
  <Container>
    <AnimationLoading />
  </Container>
);

interface LoadingContextType {
  showLoading: (flag: boolean) => void;
}
const LoadingContextInit = {
  showLoading: () => {},
};

const LoadingContext = React.createContext<LoadingContextType>(LoadingContextInit);

// const ChildrenComponents = React.memo((props: any) => {
//   return {props.children};
// });

export function LoadingProvider(props: React.PropsWithChildren<{}>) {
  const [isLoading, setLoading] = useState(false);
  const children = useMemo(() => props.children, []);
  return (
    <LoadingContext.Provider
      value={{
        showLoading: setLoading,
      }}
    >
      <>
        {children}
        {isLoading && <Loading />}
      </>
    </LoadingContext.Provider>
  );
}

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("Loading not found, useLoading must be used within the <LoadingProvider>..</LoadingProvider>");
  }
  return context;
};
