import { Paths } from "@popup/components/routes/paths";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SettingIcon from "@popup/components/Icons/SettingIcon";

const Container = styled.div`
  margin-right: 10px;
`;

const Settings = React.memo(() => {
  const history = useHistory();

  return (
    <Container className="center hover-with-cursor">
      <SettingIcon
        onClick={() => {
          history.push(Paths.settingsPage);
        }}
      />
    </Container>
  );
});

export default Settings;
