import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
export const schema = z.object({
  title: z.string().min(3).max(50),
  desc: z.string().max(150).min(0),
  id: z.union([z.number(), z.string()]),
  date: z.instanceof(dayjs as unknown as typeof Dayjs).refine(
    (i: Dayjs) => {
      return dayjs().isSameOrBefore(i);
    },
    {
      message: "Enter valid time",
    }
  ),
});

type FormData = z.infer<typeof schema>;
export default FormData;
