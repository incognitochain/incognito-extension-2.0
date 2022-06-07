import React from "react";
import { useSelector } from "react-redux";
import { validator } from "@components/ReduxForm";
import { sendDataSelector } from "./Send.selector";
import { TypeSend } from "@module/Send/Send.types";

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComp: React.FunctionComponent) => (props: any) => {
  const { screen, isIncognitoAddress, inputAddress } = useSelector(sendDataSelector);
  const getExternalAddressValidator = React.useCallback(() => {
    // default
    return validator.combinedUnknownAddress;
  }, [isIncognitoAddress]);
  const getAddressValidator = React.useCallback(() => {
    if (screen === TypeSend.SEND) {
      return validator.combinedIncognitoAddress;
    }
    return getExternalAddressValidator();
  }, [screen, isIncognitoAddress, inputAddress]);

  const getWarningAddress = React.useCallback(() => {
    // if (isExternalAddress) {
    //   return 'You are exiting Incognito and going public.';
    // }
    // return "You are exiting Incognito and going public.";
  }, []);

  const validateAddress = getAddressValidator();
  const warningAddress = getWarningAddress();

  return (
    <WrappedComp
      {...{
        ...props,
        validateAddress,
        warningAddress,
      }}
    />
  );
};

export default enhanceAddressValidation;
