import { createLogger } from "../../core/utils";
import { ConfirmedSignatureInfo, PublicKey } from "@solana/web3.js";
import { useConnection } from "../context/connection";
import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Paper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { MoreVert } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import { Links } from "./routes/paths";
import { useHistory } from "react-router-dom";
import { Theme } from "@mui/material";

const log = createLogger("incognito:trxlist");

const useStyles = makeStyles((theme: Theme) => ({
  detailButton: {
    margin: theme.spacing(1),
  },
}));

interface TransactionListProp {
  accountKey: PublicKey;
  signerKey: PublicKey;
}

export const TransactionList: React.FC<TransactionListProp> = ({ accountKey, signerKey }) => {
  const { connection } = useConnection();
  const [confirmedSignatureInfos, setConfirmedSignatureInfos] = useState<ConfirmedSignatureInfo[]>([]);

  useEffect(() => {
    log("fetching transaction for account: ", accountKey.toBase58());
    connection.getConfirmedSignaturesForAddress2(accountKey, { limit: 10 }).then((confirmedSignatureInfos) => {
      log("got transaction: ", confirmedSignatureInfos);
      setConfirmedSignatureInfos(confirmedSignatureInfos);
    });
  }, [accountKey, connection]);

  return (
    <Paper>
      <List disablePadding>
        {confirmedSignatureInfos.map((info) => (
          <TransactionListItem
            key={info.signature + info.slot}
            confirmedSignatureInfo={info}
            accountKey={accountKey}
            signerKey={signerKey}
          />
        ))}
        {confirmedSignatureInfos.map((info) => (
          <TransactionListItem
            key={info.signature + info.slot}
            confirmedSignatureInfo={info}
            accountKey={accountKey}
            signerKey={signerKey}
          />
        ))}
        {confirmedSignatureInfos.map((info) => (
          <TransactionListItem
            key={info.signature + info.slot}
            confirmedSignatureInfo={info}
            accountKey={accountKey}
            signerKey={signerKey}
          />
        ))}
      </List>
    </Paper>
  );
};

interface TransactionListItemProps {
  confirmedSignatureInfo: ConfirmedSignatureInfo;
  accountKey: PublicKey;
  signerKey: PublicKey;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ confirmedSignatureInfo, accountKey, signerKey }) => {
  const classes: any = useStyles();
  const history = useHistory();

  const transactionDetail = (transactionID: string, accountKey: PublicKey, signerKey: PublicKey) => {
    history.push(
      Links.transactionDetail({
        transactionID,
        accountAddress: accountKey.toBase58(),
        signerAddress: signerKey.toBase58(),
      }),
    );
  };

  return (
    <>
      <ListItem divider={true}>
        <ListItemText
          primary={
            <Typography variant="body2" noWrap={true}>
              {confirmedSignatureInfo.signature}
            </Typography>
          }
          secondary={confirmedSignatureInfo.slot}
        />
        <IconButton
          color="primary"
          size="small"
          className={classes.detailButton}
          onClick={() => transactionDetail(confirmedSignatureInfo.signature, accountKey, signerKey)}
        >
          <MoreVert />
        </IconButton>
      </ListItem>
    </>
  );
};
