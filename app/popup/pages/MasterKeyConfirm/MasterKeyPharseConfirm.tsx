import { withBlankLayout } from "@popup/components/layout/blank-layout";
import NavigationBar from "@popup/components/layout/navigation-bar";
import { isDebugMode } from "@utils/env";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { shuffle } from "lodash";
import React, { useMemo, useState } from "react";
import { MainLayout } from "../../components/layout/main-layout";
import { PhraseItem } from "../../components/pharse-item";
import MasterKeyPharseConfirmBase from "./MasterKeyPharseConfirmBase";

const useStyles = makeStyles((theme: any) => ({
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

interface MasterKeyPharseConfirmPageBasePropsABC {
  onBack?: () => void;
  createMasterKeySucess?: () => void;
  continueOnPress?: () => void;
  phraseList?: string[];
}

const MasterKeyPharseConfirmPageBase: React.FC<MasterKeyPharseConfirmPageBasePropsABC> = (
  props: MasterKeyPharseConfirmPageBasePropsABC,
) => {
  const styles = useStyles();

  const [phraseListSelected, setPhraseListSelected] = useState<string[]>([]);
  const { onBack = () => {}, createMasterKeySucess = () => {}, continueOnPress = () => {}, phraseList = [] } = props;

  const mnemonicCorrect = useMemo(() => phraseList.join(" "), []);
  const phraseListShuffle = useMemo(() => shuffle(phraseList), []);

  const [isPhraseCorrect, phraseSelectedString] = useMemo(() => {
    const phraseSelectedJoin = phraseListSelected.join(" ");
    return [phraseSelectedJoin === mnemonicCorrect, phraseSelectedJoin];
  }, [phraseListSelected]) as [boolean, string];

  const createMasterKeyOnClick = () => {
    continueOnPress();
  };

  const renderPhraseItem = (name: string, index: number) => {
    return (
      <PhraseItem
        title={name}
        index={index}
        isHover={true}
        enable={true}
        onClick={(title?: string) => {
          const newPhraseListSelected = [...phraseListSelected];
          const findIndex = newPhraseListSelected.findIndex((item) => item === title);
          if (findIndex != -1) {
            newPhraseListSelected.splice(findIndex, 1);
          } else {
            newPhraseListSelected.push(title || "");
          }
          setPhraseListSelected(newPhraseListSelected);
        }}
      />
    );
  };

  return (
    <>
      <NavigationBar goBack={onBack} title={"Master key pharse"} />
      <MainLayout>
        <div className={styles.box}>
          <div className={styles.box1}>
            <Typography variant="subtitle1" style={{ color: "white" }}>
              Click on these words in the correct order. If you make a mistake, click again to undo.
            </Typography>

            <Box sx={{ flexGrow: 1, marginTop: 2 }}>
              <Grid container spacing={1}>
                {phraseListShuffle.map((item, index) => (
                  <Grid item xs={4} sm={4} md={4} key={index}>
                    {renderPhraseItem(item, index)}
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Card style={{ backgroundColor: "#404040" }}>
              <CardContent style={{ backgroundColor: "#404040", marginTop: 10, height: 80 }}>
                <Typography variant="subtitle1">{phraseSelectedString}</Typography>
              </CardContent>
            </Card>
          </div>

          <div className={styles.box2}>
            <Button
              variant="contained"
              color="secondary"
              style={{ height: 50 }}
              disabled={!isDebugMode && !isPhraseCorrect}
              // disabled={false}
              onClick={createMasterKeyOnClick}
            >
              {isPhraseCorrect ? "Continue" : "That's not quite right"}
            </Button>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

// export const MasterKeyPharseConfirmPage = withBlankLayout(MasterKeyPharseConfirmPageBase);

export const MasterKeyPharseConfirmPage = MasterKeyPharseConfirmBase;
