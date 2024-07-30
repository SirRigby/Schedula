import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import ToggleDark, { ThemeMode } from "./ToggleDark";
import { useAuth0 } from "@auth0/auth0-react";
import Snackbar from "./Snackbar";

export default function ButtonAppBar() {
  const { loginWithRedirect, logout, user } = useAuth0();
  let Logogo = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Button
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
        >
          <Typography variant="h6">Schedula</Typography>
        </Button>
      </Box>
    );
  };
  const [theme, setTheme] = useState<ThemeMode>("light");
  let changeTheme = () => {
    setTheme((atheme) => (atheme === "light" ? "dark" : "light"));
  };
  const { tag, fun } = Snackbar({ message: "Logged out" });
  return (
    <Box sx={{ flexGrow: 1 }}>
      {tag}
      <AppBar position="static">
        <Toolbar>
          <Logogo />
          <Stack direction="row" spacing={2}>
            <ToggleDark theme={theme} changeTheme={changeTheme} />
            {!user && (
              <Button
                color="inherit"
                onClick={() => {
                  loginWithRedirect();
                }}
              >
                Login
              </Button>
            )}
            {user && (
              <Button
                color="inherit"
                onClick={() => {
                  logout();
                  fun();
                }}
              >
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
