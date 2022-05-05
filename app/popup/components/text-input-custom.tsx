import * as React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider, experimental_sx as sx } from "@mui/system";
const CustomizedTextField = styled(TextField)(({ theme }) => ({}));

// const CustomizedTextField = styled(TextField)`
//   color: ${(props) => props.theme.palette.primary.main};
//   border: 2px solid ${(props) => props.theme.palette.primary.main};
//   &:hover {
//     color: yellow;
//   }
// `;

// const CustomizedTextField = styled(TextField)(
//   sx({
//     "&:hover": {
//       background: "yellow",
//     },
//   }),
// );

// const CustomizedTextField = styled(TextField)`
//   background: white;
//   & label.Mui-focused {
//     color: white;
//   }
//   & .MuiTextField-underline:after {
//     border-bottom-color: white;
//   }
//   & .MuiOutlinedInput-root {
//     & fieldset {
//       border-color: white;
//     }
//     &:hover fieldset {
//       border-color: white;
//     }
//     &.Mui-focused fieldset {
//       border-color: white;
//     }
//   }
// `;
export default CustomizedTextField;
