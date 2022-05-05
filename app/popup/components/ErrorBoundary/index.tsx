import React from 'react';

interface IProps {
  children: any;
}

interface IState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: {} };
  }

  static getDerivedStateFromError = (error: any) => {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  };

  componentDidCatch = (error: any, errorInfo: any) => {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  };

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong. {error?.message || JSON.stringify(error)}</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
