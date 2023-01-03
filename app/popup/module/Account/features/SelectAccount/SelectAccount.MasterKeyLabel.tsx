import { DropdownIcon } from "@popup/components/Icons";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import useClickOutsideWithRef from "@popup/hooks/useClickOutsideWithRef";
import { useCallAsync } from "@popup/utils/notifications";
import { getMasterKeyActiveTypeSelector } from "@redux-sync-storage/masterkey/masterkey.selectors";
import { MasterKeyActiveType } from "@redux-sync-storage/masterkey/masterkey.types";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled, { ITheme } from "styled-components";

const MasterkeyItemList: {
  key: MasterKeyActiveType;
  name: MasterKeyActiveType;
}[] = [
  {
    key: "Masterkey",
    name: "Masterkey",
  },
  {
    key: "Masterless",
    name: "Masterless",
  },
];

const MasterKeyItemContainer = styled.div<{ isActive: boolean }>`
  height: 36px;
  padding-left: 12px;
  display: flex;
  justify-items: center;
  align-items: center;
  background-color: ${({ theme, isActive }: { theme: ITheme; isActive: boolean }) =>
    isActive ? theme.colorP9 : theme.primaryP9};
`;

interface MasterKeyItemProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const MasterKeyItem = (props: MasterKeyItemProps) => {
  const { name, isActive, onClick } = props;
  return (
    <MasterKeyItemContainer isActive={isActive} className={"cursor"} onClick={onClick}>
      <p className="fs-regular fw-medium">{name}</p>
    </MasterKeyItemContainer>
  );
};

const Container = styled.div`
  .masterKeyContainerLabel {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.content};
    border-radius: 8px;

    .dropDownIconContainer {
      margin-left: 8px;
    }
  }

  .dropDownContentContainer {
    padding-top: 10px;
    padding-bottom: 10px;
    display: block;
    position: absolute;
    top: 52px;
    right: 25px;
    min-width: 120px;
    background: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1);
    /* box-shadow: 1px 1px 1px 10px rgba(255, 255, 255, 0.6); */
    transform-origin: top center;
    z-index: 999999;
  }

  .dropDownContentContainer-open {
    visibility: visible;
    transform: scale(1);
    opacity: 1;
  }

  .dropDownContentContainer-close {
    visibility: hidden;
    transform: scale(0);
    opacity: 0;
  }
`;

export const MasterKeyLabel = () => {
  const masterKeyTypeActive = useSelector(getMasterKeyActiveTypeSelector);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [amountAccountMasterless, setAmountAccountMasterless] = useState(0);

  const { request } = useBackground();
  // const { enqueueSnackbar } = useSnackbar();
  const callAsync = useCallAsync();
  const { showLoading } = useLoading();

  const dropDownOnClick = () => {
    setDropDownVisible(!dropDownVisible);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    const requestAmountAccountMasterless = async () => {
      const data: any = await request("popup_requestGetAmountAccountsOfMasterless", {});
      setAmountAccountMasterless(data.result?.amountAccountMasterless || 0);
    };
    requestAmountAccountMasterless();
  }, [masterKeyTypeActive]);

  useClickOutsideWithRef(containerRef, () => {
    setDropDownVisible(false);
  });

  const masterKeyItemOnClicked = async (name: MasterKeyActiveType) => {
    // console.log("masterKeyTypeActive ", masterKeyTypeActive);
    // console.log("name ", name);

    if (name === masterKeyTypeActive) return;
    showLoading({
      value: true,
    });
    callAsync(request("popup_requestSwitchMasterKey", { masterkeyType: name }), {
      progress: { message: "Switching Masterkey..." },
      success: { message: "Done" },
      onSuccess: () => {
        showLoading({
          value: false,
        });
      },
      onError: (e) => {
        showLoading({
          value: false,
        });
      },
      onFinish: () => {
        setDropDownVisible(false);
      },
    });
  };

  const dropDownStatus = dropDownVisible ? "dropDownContentContainer-open" : "dropDownContentContainer-close";

  return (
    <Container ref={containerRef}>
      <div className="masterKeyContainerLabel cursor" onClick={dropDownOnClick}>
        <p className="fs-regular fw-medium"> {masterKeyTypeActive}</p>
        {<DropdownIcon className="dropDownIconContainer" />}
      </div>
      <div className={`dropDownContentContainer ${dropDownStatus}`}>
        {MasterkeyItemList.map((item) => {
          if (amountAccountMasterless < 1 && item.name === "Masterless") return null;
          return (
            <MasterKeyItem
              key={item.key}
              name={item.name}
              isActive={masterKeyTypeActive === item.name}
              onClick={() => masterKeyItemOnClicked(item.name)}
            />
          );
        })}
      </div>
    </Container>
  );
};
