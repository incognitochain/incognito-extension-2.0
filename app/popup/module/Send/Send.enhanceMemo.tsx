import React from "react";

const enhanceMemo = (WrappedComp: React.FunctionComponent) => (props: any) => {
  const [memoValue, setMemoValue] = React.useState("");

  const onMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemoValue(event.target.value);
  };

  React.useEffect(() => {}, []);

  return (
    <WrappedComp
      {...{
        ...props,
        onMemoChange,
        memoValue,
      }}
    />
  );
};

export default enhanceMemo;
