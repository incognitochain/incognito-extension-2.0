import { ISendState } from "@module/Send/Send.types";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { RootState } from "@redux/reducers";

const getSendData = ({
  send,
  selectedPrivacy,
  state,
}: {
  send: ISendState;
  selectedPrivacy: SelectedPrivacy;
  state: RootState;
}) => {
  console.log({
    send,
    selectedPrivacy,
    state,
  });
};

export { getSendData };
