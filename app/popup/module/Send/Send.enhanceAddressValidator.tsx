import React from "react";
import { useSelector } from "react-redux";
import { validator } from "@components/ReduxForm";
import { sendDataSelector } from "./Send.selector";
import { TypeSend } from "@module/Send/Send.types";
import { useHistory } from "react-router-dom";

export interface TInner {
  validateAddress: () => any;
  warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComp: React.FunctionComponent) => (props: any) => {
  const { screen, isIncognitoAddress, inputAddress } = useSelector(sendDataSelector);
  const history = useHistory();
  const [addressValue, setAddressValue] = React.useState("");
  const [addressError, setAddressError] = React.useState<any>(undefined);
  const isFirstTimeRender = React.useRef(true);

  const locationState = (history.location?.state as any) || {};

  const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(event.target.value);
  };

  const onAddressBlur = () => {
    if (!addressValue || addressValue.length < 1) {
      setAddressError("Required");
    }
  };

  React.useEffect(() => {
    setAddressValue(locationState?.addressValue || "");
  }, []);

  React.useEffect(() => {
    let addressErrorTmp = undefined;
    if (isFirstTimeRender.current) {
      isFirstTimeRender.current = false;
      return;
    }
    for (const validatorDetail of validator.incognitoAddressValidator) {
      const error = validatorDetail(addressValue);
      if (error) {
        addressErrorTmp = error;
        break;
      }
    }
    setAddressError(addressErrorTmp);
  }, [screen, isIncognitoAddress, inputAddress, addressValue]);

  // const getWarningAddress = React.useCallback(() => {
  // if (isExternalAddress) {
  //   return 'You are exiting Incognito and going public.';
  // }
  // return "You are exiting Incognito and going public.";
  // }, []);

  // const warningAddress = getWarningAddress();

  return (
    <WrappedComp
      {...{
        ...props,
        // validateAddress,
        // warningAddress,
        onAddressChange,
        onAddressBlur,
        addressValue,
        addressError,
      }}
    />
  );
};

export default enhanceAddressValidation;
