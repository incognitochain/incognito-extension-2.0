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
  const { screen } = useSelector(sendDataSelector);
  // const selectedPrivacy = useSelector(selectedPrivacySelector);
  // const { isAddressValidated } = useSelector(sendSelector);
  // const { symbol, isErc20Token } = selectedPrivacy;
  // const getExternalAddressValidator = React.useCallback(() => {
  //   // default
  //   return validator.combinedUnknownAddress;
  // }, [paymentAddress, isIncognitoAddress, isExternalAddress, isAddressValidated]);
  const getAddressValidator = () => {
    if (screen === TypeSend.SEND) {
      return validator.combinedIncognitoAddress;
    }
    // if (isExternalAddress) {
    //   return getExternalAddressValidator();
    // }
    return [];
  };

  const getWarningAddress = () => {
    // if (isExternalAddress) {
    //   return 'You are exiting Incognito and going public.';
    // }
    return "You are exiting Incognito and going public.";
  };

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
