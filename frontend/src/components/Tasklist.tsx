import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskStore, { Tasks } from "../context/taskStore";
import EditInfoStore from "../context/editInfoStore";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import FormData, { schema } from "../schemazod/task";
import TimeSelector from "./TimeSelector";

const Tasklist = ({ tasks }: { tasks: Tasks }) => {
  const { editing, changeEditing, expanded, changeExpanded } = EditInfoStore();
  const handleChange =
    () => (event: React.SyntheticEvent, isExpanded: boolean) => {
      changeExpanded(isExpanded ? id : -1);
    };
  const handleEdit = () => (event: React.SyntheticEvent) => {
    changeEditing(editing === id ? -1 : id);
  };
  const handleC = () => (event: React.SyntheticEvent) => {
    changeExpanded(expanded === id ? -1 : id);
    changeEditing(editing === id ? -1 : id);
  };
  const { deleteTaskGuest, updateTaskGuest } = TaskStore();
  const { title, date, desc, id } = tasks;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      date: date,
      title: title,
      desc: desc,
      id: id,
    },
    resolver: zodResolver(schema),
  });
  return (
    <form
      onSubmit={handleSubmit((d) => {
        updateTaskGuest(d);
        changeExpanded(expanded === id ? -1 : id);
        changeEditing(editing === id ? -1 : id);
      })}
    >
      <Accordion expanded={expanded === id} onChange={handleChange()}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container spacing={2}>
            <Grid item xs={7}>
              {editing !== id && <Typography noWrap>{title}</Typography>}
              {editing === id && (
                <TextField
                  onClick={(event: React.SyntheticEvent) => {
                    event.stopPropagation();
                  }}
                  {...register("title")}
                  id="standard-basic"
                  label="Title"
                  fullWidth
                  variant="standard"
                  sx={{ Width: "100%" }}
                  error={errors.title ? true : false}
                  helperText={errors.title?.message}
                />
              )}
            </Grid>
            <Grid item xs={4}>
              {editing !== id && <Typography>{date.format()}</Typography>}
              {editing === id && (
                <span
                  onClick={(event: React.SyntheticEvent) => {
                    event.stopPropagation();
                  }}
                >
                  <Controller
                    name="date"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TimeSelector value={value} onChange={onChange} />
                    )}
                  />
                </span>
              )}
            </Grid>
            <Grid item xs={1}>
              <Button
                onClick={(event: React.SyntheticEvent) => {
                  event.stopPropagation();
                  deleteTaskGuest(tasks.id);
                }}
                color="primary"
                sx={{ margin: "5px", marginRight: "0px" }}
                border-width="10px"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          {editing !== id && (
            <Typography sx={{ wordBreak: "break-word" }}>{title}</Typography>
          )}
          {editing !== id && (
            <Typography sx={{ wordBreak: "break-word" }}>{desc}</Typography>
          )}
          {editing === id && (
            <TextField
              {...register("desc")}
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              fullWidth={true}
              sx={{ marginTop: "20px", width: "100%" }}
              error={errors.desc ? true : false}
              helperText={errors.desc?.message}
            />
          )}
          <Grid container justifyContent="flex-end">
            <Stack direction={"row"} border={"5px"}>
              {editing !== id && (
                <Button
                  onClick={handleEdit()}
                  color="primary"
                  sx={{ margin: "5px", marginRight: "0px" }}
                >
                  Edit
                </Button>
              )}
              {editing === id && (
                <Button
                  type="submit"
                  color="primary"
                  sx={{ margin: "5px", marginRight: "0px" }}
                >
                  Submit
                </Button>
              )}
              {editing === id && (
                <Button
                  color="primary"
                  sx={{ margin: "5px", marginRight: "0px" }}
                  onClick={handleC()}
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </form>
  );
};

export default Tasklist;
