import React, { useContext, useMemo, useState } from "react";
import styled, { ITheme } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP6};
  opacity: 0.9;
  .wrap-loading-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 8px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP5};
    border-radius: 8px;
    width: 90%;
  }
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

const Message = styled.p`
  margin-top: 10px;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  text-align: center;
`;

interface LoadingProps {
  message?: string;
}

export const Loading = (props: LoadingProps) => (
  <Container>
    <div className="wrap-loading-view">
      <AnimationLoading />
      {props.message && <Message className="fs-regular fw-suppermedium">{props.message}</Message>}
    </div>
  </Container>
);

interface ShowLoadingProps {
  value: boolean;
  message?: string;
}
interface LoadingContextType {
  showLoading: (_: ShowLoadingProps) => void;
}
const LoadingContextInit = {
  showLoading: () => {},
};

const LoadingContext = React.createContext<LoadingContextType>(LoadingContextInit);

export function LoadingProvider(props: React.PropsWithChildren<{}>) {
  const [loadingProps, setLoading] = useState<ShowLoadingProps>({
    value: false,
    message: "Loading...",
  });
  const children = useMemo(() => props.children, []);
  return (
    <LoadingContext.Provider
      value={{
        showLoading: setLoading,
      }}
    >
      <>
        {children}
        {loadingProps.value && <Loading message={loadingProps.message || "Loading..."} />}
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
