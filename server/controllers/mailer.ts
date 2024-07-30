import nodemailer from "nodemailer";
import { completed, pending } from "../models/tasks";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "codechefa1@gmail.com",
    pass: "poxyxnehgfefooxe",
  },
});
async function sendmail(
  recv: string,
  title: string,
  desc: string | null,
  date: number
) {
  // send mail with defined transport object
  const dd = new Date(date);
  const info = await transporter.sendMail({
    from: '"Schedula " <sebastian.klein83@ethereal.email>', // sender address
    to: recv, // list of receivers
    subject: title, // Subject line
    text: dd.toLocaleString() + "\n" + desc, // plain text body
    //html: "<b>Hello world?</b>", // html body
  });
}

const cleanCompleted = async () => {
  await completed.deleteMany({ date: { $gte: Date.now() } });
};

const checkPending = async () => {
  const ddr = Date.now() + 1000 * 60;
  const listsched = await pending
    .find({
      date: { $lte: ddr },
    })
    .exec();
  listsched.map((ele) => {
    ele.desc !== undefined &&
      sendmail(ele.creator, ele.title, ele.desc, ele.date);
  });
  await pending.deleteMany({
    date: { $lte: ddr },
  });
  await completed.insertMany(listsched);
};

export default function dbutil() {
  setInterval(cleanCompleted, 1000 * 60 * 60);
  setInterval(checkPending, 1000 * 60);
}
