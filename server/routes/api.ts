import express from "express";

import { getTasks, addTask, deleteTask, updateTask } from "../controllers/api";
const router = express.Router();

router
  .post("/get", async (req, res) => {
    const obj = await getTasks(req.body.user, req.body.countp, req.body.countc);
    return res.status(200).json(obj);
  })
  .post("/", async (req, res) => {
    const idT = await addTask(req.body.task);
    return res.status(200).json({ id: idT });
  })
  .delete("/", async (req, res) => {
    await deleteTask(req.body.task);
    return res.status(200).json({});
  })
  .put("/", async (req, res) => {
    await updateTask(req.body.task);
    return res.status(200).json({});
  });

export default router;
