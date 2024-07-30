import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { List } from "@mui/material";
import Tasklist from "./Tasklist";
import TaskStore from "../context/taskStore";
import { date } from "zod";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [T, setT] = React.useState(0);
  const { task: taskList } = TaskStore();

  const fTasks = () => {
    setT((prevT: number) => {
      const newT = 1 ^ prevT;
      return newT;
    });
  };
  React.useEffect(() => {
    setInterval(fTasks, 1000);
  }, []);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="All" />
        <Tab label="Pending" />
        <Tab label="Upcoming" />
      </Tabs>
    </Box>
  );
}
