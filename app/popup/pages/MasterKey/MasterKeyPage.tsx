import { withBlankLayout } from "@popup/components/layout/blank-layout";
import NavigationBar from "@popup/components/layout/navigation-bar";
import { Bookmark } from "@material-ui/icons";
import { Grid, IconButton, Theme, Typography, Box, Button, Card, CardContent, FormControlLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MainLayout } from "@popup/components/layout/main-layout";
import { PhraseItem } from "@popup/components/pharse-item";
import React, { useLayoutEffect, useState } from "react";

const { newMnemonic } = require("incognito-chain-web-js/build/wallet");

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  box1: {
    flex: 4,
    display: "flex",
    flexDirection: "column",
  },
  box2: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  box3: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

interface MasterKeyPharsePageBaseProps {
  onBack?: () => void;
  masterKeyName?: string;
  phraseList?: string[];
  saveMyPhraseOnClick?: (mnemonic: string, phraseList: string[]) => void;
}

const MasterKeyPharsePageBase: React.FC<MasterKeyPharsePageBaseProps> = (props: MasterKeyPharsePageBaseProps) => {
  const styles = useStyles();
  const [mnemonic, setMnemonic] = useState("");
  const [phraseListLocal, setPhraseListLocal] = useState<string[]>([]);
  const { onBack = () => {}, masterKeyName = "", phraseList = [], saveMyPhraseOnClick = () => {} } = props;

  useLayoutEffect(() => {
    if (!phraseList || phraseList.length < 1) {
      const mnemonic: string = newMnemonic() || "";
      setMnemonic(mnemonic);
      setPhraseListLocal((mnemonic.split(" ") as string[]) || []);
    } else {
      setPhraseListLocal(phraseList);
    }
  }, []);

  const copyTextOnClick = () => {
    mnemonic &&
      mnemonic.length > 0 &&
      navigator.clipboard.writeText(mnemonic).then(
        function () {
          console.log("Copying to clipboard was successful!");
          alert("Copying to clipboard was successful!");
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
          alert("Could not copy text: ");
        },
      );
  };

  const renderPhraseItem = (name: string, index: number) => {
    return <PhraseItem title={name} index={index} isHover={false} />;
  };

  const saveMyPhrase = () => {
    saveMyPhraseOnClick && saveMyPhraseOnClick(mnemonic, phraseListLocal);
  };

  return (
    <>
      <NavigationBar goBack={onBack} title={"Master key pharse"} />
      <MainLayout>
        <div className={styles.box}>
          <div className={styles.box1}>
            <Card style={{ backgroundColor: "#FFC043" }}>
              <CardContent>
                <FormControlLabel
                  control={
                    <IconButton disabled={true}>
                      <Bookmark style={{ color: "black", width: 35, height: 35 }} />
                    </IconButton>
                  }
                  label={
                    <Typography variant="subtitle1" style={{ color: "black" }}>
                      Save these words in the correct order. Never share this phrase with anyone.
                    </Typography>
                  }
                />
              </CardContent>
            </Card>

            <Box sx={{ flexGrow: 1, marginTop: 2 }}>
              <Grid container spacing={1}>
                {phraseListLocal.map((item, index) => (
                  <Grid item xs={4} sm={4} md={4} key={index}>
                    {renderPhraseItem(item, index)}
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Button
              onClick={copyTextOnClick}
              variant="contained"
              autoCapitalize="none"
              style={{
                alignSelf: "center",
                width: 100,
                flexWrap: "wrap",
                marginTop: 20,
                marginBottom: 20,
                backgroundColor: "#404040",
                color: "white",
              }}
            >
              Copy
            </Button>
          </div>

          <div className={styles.box2}>
            <Button variant="contained" color="secondary" style={{ height: 50 }} onClick={saveMyPhrase}>
              I'm saved my phrase
            </Button>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export const MasterKeyPharsePage = withBlankLayout(MasterKeyPharsePageBase);
