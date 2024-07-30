import { Button, Grid, Stack, TextField } from "@mui/material";
import TimeSelector, { curTime } from "./TimeSelector";
import { Controller, useForm } from "react-hook-form";
import FormData, { schema } from "../schemazod/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dayjs } from "dayjs";
import TaskStore, { Tasks } from "../context/taskStore";

interface Props {
  date?: Dayjs;
  title?: string;
  desc?: string;
  id?: number;
}

const Taskform = ({ date, desc, title }: Props) => {
  const rat = 8;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      date: date ? date : curTime,
      title: title ? title : "",
      desc: desc ? desc : "",
      id: 0,
    },
    resolver: zodResolver(schema),
  });
  const { addTaskGuest, counter } = TaskStore();
  return (
    <form
      onSubmit={handleSubmit((d) => {
        let r: Tasks = {
          id: counter,
          title: d.title,
          desc: d.desc ? d.desc : "",
          date: d.date,
        };
        addTaskGuest(r);
        console.log(counter);
      })}
    >
      <Grid container spacing={2} margin=" 5px">
        <Grid item xs={rat}>
          <Stack>
            <TextField
              {...register("title")}
              id="standard-basic"
              label="Title"
              variant="standard"
              sx={{ marginTop: "20px", maxWidth: "75%" }}
              error={errors.title ? true : false}
              helperText={errors.title?.message}
            />
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
          </Stack>
        </Grid>
        <Grid item xs={12 - rat} padding={"20px"}>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TimeSelector value={value} onChange={onChange} />
            )}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Button type="submit" color="primary" sx={{ marginRight: "0px" }}>
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default Taskform;
