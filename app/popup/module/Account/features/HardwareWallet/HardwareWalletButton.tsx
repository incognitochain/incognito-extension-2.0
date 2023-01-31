import React from "react";

import { HARDWARE_DEVICE_EMULATOR } from "@constants/config";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import { Container, PrimaryButtonStyled } from "./HardwareWalletButton.styled";

const ledgerUSBVendorId = 11415;

const HardwareWalletButton = React.memo(() => {
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const { showLoading } = useLoading();

  const connectHardwareWallet = () => {
    showLoading({
      value: true,
    });
    const { hid } = navigator as any;

    callAsync(
      hid
        .getDevices()
        .then((deviceLst: any) => {
          deviceLst = deviceLst.filter((d: any) => d.vendorId === ledgerUSBVendorId);
          if (deviceLst?.length === 0) {
            if (HARDWARE_DEVICE_EMULATOR) return;
            return chrome.tabs.create({ url: chrome.runtime.getURL("assets/request-device.html") });
          } else {
            return deviceLst; // Promise.all(deviceLst.map((d: any) => (d.opened ? d.close() : Promise.resolve(null))));
          }
        })
        .then((_: any) => request("popup_hardwareWalletConnect", { accountName: undefined })),
      {
        progress: { message: "Connect Hardware Wallet ..." },
        success: { message: "Done" },
        onSuccess: () => {
          showLoading({
            value: false,
          });
        },
        onError: (e) => {
          console.log("[connectHardwareWallet] ERROR: ", e);
          showLoading({
            value: false,
          });
        },
      },
    );
  };

  return (
    <Container>
      <PrimaryButtonStyled onClick={connectHardwareWallet}>{"Connect Hardware Wallet"}</PrimaryButtonStyled>
    </Container>
  );
});

export default HardwareWalletButton;
