// import debounce from "lodash/debounce";
import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { actionFetchFee } from "./Send.actions";
// import { ISendData } from "./Send.types";
// import { sendDataSelector } from "./Send.selector";

export interface TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  // const dispatch = useDispatch();
  // const { inputAddress, inputAmount, inputMemo, isIncognitoAddress, isExternalAddress }: ISendData =
  //   useSelector(sendDataSelector);
  // const handleChangeForm = async ({
  //   address,
  //   amount,
  //   memo,
  //   isExternalAddress,
  //   isIncognitoAddress,
  // }: {
  //   address: string;
  //   amount: string;
  //   memo: string;
  //   isExternalAddress: boolean;
  //   isIncognitoAddress: boolean;
  // }) => {
  //   try {
  //     if (!amount || !address) {
  //       return;
  //     }
  //     let defaultScreen = "Send";
  //     if (isExternalAddress) {
  //       defaultScreen = "UnShield";
  //     } else if (isIncognitoAddress) {
  //       defaultScreen = "Send";
  //     }
  //     await dispatch(
  //       actionFetchFee({
  //         amount,
  //         address,
  //         screen: defaultScreen,
  //         memo,
  //       }),
  //     );
  //   } catch (error) {
  //     // Handle fetch fee with error
  //   }
  // };
  //
  // const deHandleChangeForm = React.useRef(debounce(handleChangeForm, 500));
  //
  // React.useEffect(() => {
  //   deHandleChangeForm.current({
  //     address: inputAddress,
  //     amount: inputAmount,
  //     memo: inputMemo,
  //     isExternalAddress,
  //     isIncognitoAddress,
  //   });
  // }, [inputAddress, inputAmount, inputMemo, isExternalAddress, isIncognitoAddress]);
  return <WrappedComponent {...props} />;
};

export default enhance;
