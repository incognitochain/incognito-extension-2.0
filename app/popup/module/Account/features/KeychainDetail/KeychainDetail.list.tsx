import React, { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { getAccountWithPaymentAddress } from "@redux/account/account.selectors";
import Header from "@components/Header";
import WrapContent from "@components/Content";
import { KeyChainDetailItem } from "@module/Account/features/KeychainDetail";
import { useBackground } from "@popup/context/background";

const parseShard = (bytes: any) => {
  const arr = bytes.split(",");
  const lastByte = arr[arr.length - 1];
  return (lastByte % 8).toString();
};

const KeychainDetailList = React.memo(() => {
  const { request } = useBackground();
  const location = useLocation();

  const [accountDetail, setAccountDetail] = useState(undefined);
  const PaymentAddressSelected = (location.state as any).PaymentAddress;
  if (!PaymentAddressSelected) return null;

  useLayoutEffect(() => {
    const requestAccountDetail = async () => {
      const data: any = await request("popup_request_account_detail", { paymentAddress: PaymentAddressSelected });
      setAccountDetail(data.result.accountDetail);
    };
    requestAccountDetail();
  }, []);

  // const selectedAccount = useSelector(getAccountWithPaymentAddress(PaymentAddressSelected));
  if (!accountDetail) return null;
  const {
    name,
    paymentAddress = "",
    privateKey = "",
    publicKeyCheckEncode = "",
    readonlyKey = "",
    validatorKey = "",
    blsPublicKey = "",
    otaKey = "",
    id = "",
    publicKeyBytes = "",
  } = accountDetail as any;

  const headerName = `${name || "Anon"}'s keys`;

  return (
    <>
      <Header title={headerName} />
      <WrapContent className="scroll-view no-padding">
        <KeyChainDetailItem title="Your incognito address" description={paymentAddress} />
        <KeyChainDetailItem title="Private key" description={privateKey} />
        <KeyChainDetailItem title="Public key" description={publicKeyCheckEncode} />
        <KeyChainDetailItem title="Readonly key" description={readonlyKey} />
        <KeyChainDetailItem title="Validator key" description={validatorKey} />
        <KeyChainDetailItem title="Validator Public key" description={blsPublicKey} />
        <KeyChainDetailItem title="OTA key" description={otaKey} />
        <KeyChainDetailItem title="ID" description={id} />
        <KeyChainDetailItem title="Shard" description={(publicKeyBytes && parseShard(publicKeyBytes)) || ""} />
      </WrapContent>
    </>
  );
});

export default KeychainDetailList;
