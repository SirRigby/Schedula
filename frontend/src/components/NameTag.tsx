import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Card, Typography } from "@mui/material";
import LoginInfoStore from "../context/loginInfoStore";

const NameTag = () => {
  const { user } = useAuth0();
  const { login: mountlogin, logout: mountlogout } = LoginInfoStore();
  useEffect(() => {
    user && user.name && user.email && mountlogin(user.name, user.email);
    !user && mountlogout;
  }, [user]);

  return (
    <Card variant="outlined">
      <Typography padding={"15px"} fontSize={"19px"}>
        Welcome, {user && user.name}
        {!user && (
          <Box
            display="inline"
            borderRadius={"20px"}
            border="solid"
            padding="4px"
            paddingRight={"8px"}
            borderColor={"blue"}
          >
            Guest
          </Box>
        )}
      </Typography>
    </Card>
  );
};

export default NameTag;
