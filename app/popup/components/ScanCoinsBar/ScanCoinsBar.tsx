import styled, { ITheme } from "styled-components";
import React from "react";
import Storage from "@services/storage";
import { PRV_ID } from "@constants/common";
import format from "@utils/format";

interface ScanCoinsBarProps {
  className?: string;
}

export const COINS_INDEX_STORAGE_KEY = "COINS_INDEX_STORAGE_KEY";

const Styled = styled.div`
  width: fit-content;
  height: 40px;
  background: ${({ theme }: { theme: ITheme }) => theme.primaryP5};
  border-radius: 8px;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 2s;
  padding: 0 8px 0 8px;
  opacity: 0.9;
  min-width: 115px;
`;

export const ScanCoinsBar = (props: ScanCoinsBarProps) => {
  const { className } = props;
  const [percent, setPercent] = React.useState(0);
  const getPercentScan = async () => {
    Storage.getItem(COINS_INDEX_STORAGE_KEY).then((data) => {
      if (data) {
        const { coinsLen, prvLen, tokenID, batchStart } = JSON.parse(data);
        const index = tokenID === PRV_ID ? batchStart : batchStart + prvLen;
        const percent = format.toFixed({
          number: Number(index / coinsLen) * 100,
          decimals: 2,
        });
        setPercent(Number(percent));
      }
    });
  };
  const handlePercent = async () => {
    await getPercentScan();
    setInterval(async () => {
      await getPercentScan();
    }, 4000);
  };

  React.useEffect(() => {
    handlePercent().then();
  }, []);

  return (
    <Styled className={`hover disable-pointer ${className || ""}`}>
      <p className="fs-small fw-medium">Syncing {percent}%</p>
    </Styled>
  );
};
