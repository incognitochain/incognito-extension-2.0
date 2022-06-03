import React from "react";
import { useSelector } from "react-redux";
import { validator } from "@components/ReduxForm";
import { sendDataSelector, sendSelector } from "./Send.selector";

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComp: React.FunctionComponent) => (props: any) => {
  // const { isExternalAddress, paymentAddress, isIncognitoAddress } = useSelector(sendDataSelector);
  // const selectedPrivacy = useSelector(selectedPrivacySelector);
  // const { isAddressValidated } = useSelector(sendSelector);
  // const { symbol, isErc20Token } = selectedPrivacy;
  // const getExternalAddressValidator = React.useCallback(() => {
  //   // default
  //   return validator.combinedUnknownAddress;
  // }, [paymentAddress, isIncognitoAddress, isExternalAddress, isAddressValidated]);
  // const getAddressValidator = () => {
  //   if (isExternalAddress) {
  //     return getExternalAddressValidator();
  //   }
  //   if (isIncognitoAddress) {
  //     return validator.combinedIncognitoAddress;
  //   }
  //   return [];
  // };
  //
  // const getWarningAddress = () => {
  //   if (isExternalAddress) {
  //     return 'You are exiting Incognito and going public.';
  //   }
  // };
  //
  // const validateAddress = getAddressValidator();
  //
  // const warningAddress = getWarningAddress();

  return (
    <WrappedComp
      {...{
        ...props,
        // validateAddress,
        // warningAddress,
      }}
    />
  );
};

export default enhanceAddressValidation;
