import { Box, List } from "@mui/material";
import CreateTask from "./CreateTask";
import Tasklist from "./Tasklist";
import TaskStore, { Tasks } from "../context/taskStore";
import NameTag from "./NameTag";
import axios from "axios";
import address from "../context/apiAdd";
import { useEffect } from "react";
import dayjs from "dayjs";
import LoginInfoStore from "../context/loginInfoStore";

const MainBox = () => {
  const { task: taskList, addTaskList } = TaskStore();
  const { userid } = LoginInfoStore();
  useEffect(() => {
    const id = userid;
    axios({
      method: "post",
      url: address + "get/",
      data: {
        user: id,
        countp: "0",
        countc: "0",
      },
    }).then(async function (response: {
      data: { pending: any; completed: any };
    }) {
      const temp: Tasks[] = response.data.pending.map((ele: any) => {
        return {
          id: ele._id,
          title: ele.title,
          desc: ele.desc,
          date: dayjs(ele.date),
        };
      });
      const temp2: Tasks[] = response.data.completed.map((ele: any) => {
        return {
          id: ele._id,
          title: ele.title,
          desc: ele.desc,
          date: dayjs(ele.date),
        };
      });
      await addTaskList([...temp, ...temp2]);
    });
  }, [userid]);
  return (
    <Box sx={{ marginTop: "25px" }}>
      {/* <TaskTab /> */}
      <NameTag />
      <CreateTask />
      <List style={{ width: "100%", listStyleType: "none" }}>
        {taskList.map((task) => (
          <li key={task.id}>
            <Tasklist tasks={task}></Tasklist>
          </li>
        ))}
      </List>
    </Box>
  );
};

export default MainBox;
