import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";

export type ThemeMode = "light" | "dark";
interface Props {
  theme: ThemeMode;
  changeTheme: () => void;
}

const ToggleDark = (props: Props) => {
  let ico = props.theme === "light" ? <LightModeIcon /> : <DarkModeIcon />;
  return (
    <IconButton
      color="inherit"
      aria-label="toggle-theme"
      onClick={props.changeTheme}
    >
      {ico}
    </IconButton>
  );
};

export default ToggleDark;
