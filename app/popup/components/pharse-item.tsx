import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import * as React from "react";

const PaperStyled = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#303030",
  minHeight: 50,
  maxHeight: 70,
  minWidth: 110,
  maxWidth: 130,
  borderWidth: 2,
  borderColor: "#404040",
  borderRadius: 8,
  padding: 2,
  elevation: 4,
}));

interface PhraseItemProps {
  title?: string;
  index?: number;
  isHover?: boolean;
  enable?: boolean;
  onClick?: (title?: string, index?: number) => void;
}

export const PhraseItem = (props: PhraseItemProps) => {
  const { title = "", index = 0, onClick, isHover, enable = false } = props;

  const [isActive, setActive] = React.useState(false);

  const addHover: any =
    (enable &&
      isHover && {
        "&:hover": {
          borderColor: "#1A73E8",
        },
      }) ||
    {};

  const onClickHandler = () => {
    if (enable) {
      setActive(!isActive);
      onClick && onClick(title, index);
    }
  };

  const backgroundColor = isActive ? "#404040" : "#303030";
  const justifyContent = enable ? "center" : "flex-start";

  return (
    <PaperStyled
      variant="outlined"
      sx={{ ...addHover, justifyContent, backgroundColor }}
      onClick={onClickHandler}
    >
      {!enable && (
        <Typography variant="subtitle1" style={{ color: "grey", marginRight: 4 }}>
          #{index + 1}
        </Typography>
      )}
      <Typography variant="subtitle1" style={{ color: "white" }}>
        {title}
      </Typography>
    </PaperStyled>
  );
};

export default PaperStyled;
