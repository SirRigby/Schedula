import { Dayjs } from "dayjs";
import { create } from "zustand";

export interface Tasks {
  id: number | string;
  title: string;
  desc: string;
  date: Dayjs;
}

interface TaskInterface {
  task: Tasks[];
  counter: number;
  addTaskGuest: (a: Tasks) => void;
  deleteTaskGuest: (a: number | string) => void;
  updateTaskGuest: (a: Tasks) => void;
  addTaskList: (a: Tasks[]) => void;
}

const TaskStore = create<TaskInterface>((set) => ({
  task: [],
  counter: 0,
  addTaskGuest: (a) =>
    set((state) => ({ task: [a, ...state.task], counter: state.counter + 1 })),
  deleteTaskGuest: (a) =>
    set((state) => ({
      task: state.task.filter((ele) => {
        return ele.id !== a;
      }),
    })),
  updateTaskGuest: (a) =>
    set((state) => ({
      task: state.task.map((ele) => {
        if (ele.id === a.id) {
          return a;
        } else {
          return ele;
        }
      }),
    })),
  addTaskList: (a) => {
    set(() => ({
      task: a,
      counter: a.length,
    }));
  },
}));

export default TaskStore;
