import { withBlankLayout } from "@/popup/components/layout/blank-layout";
import NavigationBar from "@/popup/components/layout/navigation-bar";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { shuffle } from "lodash";
import React, { useMemo, useState } from "react";
import { MainLayout } from "../../components/layout/main-layout";
import { PhraseItem } from "../../components/pharse-item";
import { Theme } from "@mui/material";

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

interface MasterKeyPharseConfirmPageBaseProps {
  onBack?: () => void;
  createMasterKeySucess?: () => void;
  phraseList?: string[];
}

const MasterKeyPharseConfirmPageBase: React.FC<MasterKeyPharseConfirmPageBaseProps> = (
  props: MasterKeyPharseConfirmPageBaseProps,
) => {
  const styles = useStyles();

  const [phraseListSelected, setPhraseListSelected] = useState<string[]>([]);
  const { onBack = () => {}, createMasterKeySucess = () => {}, phraseList = [] } = props;

  const mnemonicCorrect = useMemo(() => phraseList.join(" "), []);
  const phraseListShuffle = useMemo(() => shuffle(phraseList), []);

  const [isPhraseCorrect, phraseSelectedString] = useMemo(() => {
    const phraseSelectedJoin = phraseListSelected.join(" ");
    return [phraseSelectedJoin === mnemonicCorrect, phraseSelectedJoin];
  }, [phraseListSelected]) as [boolean, string];

  const createMasterKeyOnClick = () => {
    console.log("createMasterKeyOnClick TO DO");
    // history.push(Links.masterKeyPhraseCreatedPage());
    createMasterKeySucess();
  };

  const renderPhraseItem = (name: string, index: number) => {
    return (
      <PhraseItem
        title={name}
        index={index}
        isHover={true}
        enable={true}
        onClick={(title?: string, index?: number) => {
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
              disabled={!isPhraseCorrect}
              onClick={createMasterKeyOnClick}
            >
              {isPhraseCorrect ? "Let's Go" : "That's not quite right"}
            </Button>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export const MasterKeyPharseConfirmPage = withBlankLayout(MasterKeyPharseConfirmPageBase);
