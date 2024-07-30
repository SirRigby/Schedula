import { connect } from "mongoose";
export default async function connectDB(url: string) {
  return connect(url)
    .then(() => console.log("con"))
    .catch((error) => console.log(error));
}
