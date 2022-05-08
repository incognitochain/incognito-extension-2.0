import React from "react";
import { withLayout } from "../components/layout";
import { useBackground } from "../context/background";
import { LoadingIndicator } from "../components/loading-indicator";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useCallAsync } from "../utils/notifications";
import { Empty } from "../components/empty";

const AuthorizedWebsitesPageBase: React.FC = () => {
  const { popupState, request } = useBackground();
  const callAsync = useCallAsync();

  if (!popupState) {
    return <LoadingIndicator />;
  }

  const origins = popupState.authorizedOrigins;

  const deleteWebsite = (origin: string) => {
    console.log("delete item:", origin);
    callAsync(
      request("popup_deleteAuthorizedWebsite", {
        origin: origin,
      }),
      {
        progress: { message: "Deleting website..." },
        success: { message: "Success!" },
      },
    );
  };

  return (
    <>
      <Container fixed maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1 }} component="h2">
                    Authorized Websites
                  </Typography>
                </Toolbar>
              </AppBar>
              <List disablePadding>
                {Object.keys(origins).length === 0 && (
                  <ListItem key={"no-website-found"}>
                    <ListItemText
                      primary={<Empty title={"No Authorized Website"} description={""} />}
                    />
                  </ListItem>
                )}
                {origins.map((origin: string) => (
                  <ListItem key={`authorize-website-${origin}`}>
                    <ListItemText primary={origin} />
                    <IconButton onClick={() => deleteWebsite(origin)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const AuthorizedWebsitesPage = withLayout(AuthorizedWebsitesPageBase);
