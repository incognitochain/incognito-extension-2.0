import React from "react";
import { format } from "@popup/utils";

export const useCountDown = (props: { time?: number }) => {
  const [state, setState] = React.useState({
    time: props?.time || 3600,
  });
  const { time } = state;
  const handleCountDown = async () => {
    await setState({ ...state, time: time - 1 });
  };

  React.useEffect(() => {
    const intervalId = setInterval(handleCountDown, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });
  return [format.formatTime(time)];
};
