import { connect, Schema, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  date: {
    type: Number,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
});

export const pending = model("pending", schema);
export const completed = model("completed", schema);
