export const getPrice = ({ token, tokenUSDT }: any) => {
  const defaultValue = {
    pricePrv: 0,
    change: "0",
    priceUsd: 0,
  };
  if (!tokenUSDT) {
    return defaultValue;
  }
  return {
    change: token?.change || defaultValue.change,
    pricePrv: token?.pricePrv !== 0 ? token?.pricePrv : 0,
    priceUsd: token?.priceUsd !== 0 ? token?.priceUsd : 0,
  };
};
