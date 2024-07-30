import { Task } from "../models/interfaces";
import { pending, completed } from "../models/tasks";

export const addTask = async (t: Task) => {
  let model = pending;
  if (Date.now() >= t.date) {
    model = completed;
  }
  const que = await model.create(t);
  return que._id;
};
export const deleteTask = async (t: Task) => {
  let model = pending;
  if (Date.now() >= t.date) {
    model = completed;
  }
  const que = await model.deleteOne({ _id: t.id }).exec();
  return que.deletedCount != 0;
};
export const updateTask = async (t: Task) => {
  const existed = await deleteTask(t);
  if (existed) {
    await addTask(t);
  }
};
export const getTasks = async (
  user: string,
  countp: number,
  countc: number
) => {
  const queUpd = await pending
    .find({ creator: user })
    .sort({ date: 1 })
    .limit(countp)
    .exec();
  const queCom = await completed
    .find({ creator: user })
    .sort({ date: -1 })
    .limit(countc)
    .exec();
  return {
    pending: queUpd,
    completed: queCom,
  };
};
