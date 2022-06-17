import WrapContent from "@components/Content/Content";
import Header from "@components/Header";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import React, { useRef, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { PrimaryButtonContaniner, Label, TextInputWraper } from "./AddNetwork.styled";
import TextInput from "@popup/components/Inputs/TextInput";
import { DropDown } from "@popup/components/DropDown/DropDown";
import Server from "@services/wallet/Server";
import { validURL } from "@utils/func";
import { useSnackbar } from "notistack";

const AddNetworkPage: React.FC = () => {
  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  const networkNameTextInput = useRef<any>(null);
  const [networkName, setNetworkName] = useState("");
  const [networkNameError, setNetworkNameError] = useState("");

  const [networkType, setNetworkType] = useState<"mainnet" | "testnet">("mainnet");

  const fullNodeURLTextInput = useRef<any>(null);
  const [fullNodeURL, setFullNodeURL] = useState("");
  const [fullNodeURLError, setFullNodeURLError] = useState("");

  const shardNumberTextInput = useRef<any>(null);
  const [shardNumber, setShardNumber] = useState<string>("8");
  const [shardNumberError, setShardNumberError] = useState("");

  const addNetworkHandler = async () => {
    console.log("addNetworkHandler TO DO");

    let valid = true;
    if (!networkName || networkName.trim().length < 1) {
      setNetworkNameError("Name is required");
      valid = false;
    }
    if (!fullNodeURL || fullNodeURL.trim().length < 1) {
      setFullNodeURLError("URL is required");
      valid = false;
    }

    if (!validURL(fullNodeURL)) {
      setFullNodeURLError("The URL is invalid");
      valid = false;
    }

    if (!shardNumber || shardNumber.length < 1) {
      setShardNumberError("URL is required");
      valid = false;
    }

    if (valid) {
      try {
        await Server.addNetwork({
          name: networkName,
          url: fullNodeURL,
          networkType: networkType,
          shardNumber: parseInt(shardNumber),
        });
        enqueueSnackbar("Add Network Done", { variant: "success" });
        history.goBack();
      } catch (e) {
        console.log("error : ", e);
        enqueueSnackbar(e.message, { variant: "error" });
      }
    }
  };

  const networkOnChange = useCallback((e: any) => {
    setNetworkName(e.target.value);
    setNetworkNameError("");
  }, []);

  const fullNodeOnChange = useCallback((e: any) => {
    setFullNodeURL(e.target.value);
    setFullNodeURLError("");
  }, []);

  const shardNumberOnChange = useCallback((e: any) => {
    setShardNumberError("");
    if (e && e.target.value.length <= 2) {
      setShardNumber(e.target.value);
    }
    if (parseInt(e.target.value) > 64) {
      setShardNumber("64");
    }
  }, []);

  return (
    <>
      <Header title="Add Network" />
      <WrapContent className="default-padding-horizontal">
        <Label className="fs-regular fw-regular">{"Network Name"}</Label>
        <TextInputWraper>
          <TextInput
            refInput={networkNameTextInput}
            value={networkName}
            placeholder={"Enter a network name"}
            onChange={networkOnChange}
            errorEnable={networkNameError.length > 0}
            errorText={networkNameError}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === "enter") {
                //TO DO
              }
            }}
          />
        </TextInputWraper>

        <Label className="fs-regular fw-regular">{"Network Type"}</Label>
        <DropDown
          dataList={["mainnet", "testnet"]}
          defaultItem={networkType}
          itemOnClick={(item) => {
            setNetworkType(item);
          }}
        />

        <Label className="fs-regular fw-regular">{"FullNode URL"}</Label>
        <TextInputWraper>
          <TextInput
            refInput={fullNodeURLTextInput}
            value={fullNodeURL}
            placeholder={"Enter a FullNode URL"}
            onChange={fullNodeOnChange}
            errorEnable={fullNodeURLError.length > 0}
            errorText={fullNodeURLError}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === "enter") {
                //TO DO
              }
            }}
          />
        </TextInputWraper>

        <Label className="fs-regular fw-regular">{"Number of Shard"}</Label>
        <TextInputWraper>
          <TextInput
            refInput={shardNumberTextInput}
            type={"number"}
            value={(shardNumber && shardNumber?.toString()) || "8"}
            placeholder={"Enter shard number"}
            onChange={shardNumberOnChange}
            errorEnable={shardNumberError.length > 0}
            errorText={shardNumberError}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === "enter") {
                //TO DO
              }
            }}
          />
        </TextInputWraper>

        <PrimaryButtonContaniner onClick={addNetworkHandler}>{"Add"}</PrimaryButtonContaniner>
      </WrapContent>
    </>
  );
};
export default AddNetworkPage;
