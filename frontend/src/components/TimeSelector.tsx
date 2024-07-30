import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

dayjs.extend(utc);
dayjs.extend(timezone);

interface timetype {
  value: Dayjs | null;
  onChange: (a: Dayjs | null) => void;
}

export let curTime = dayjs.utc(dayjs());

export default function StoreUTCButDisplaySystemTimezone({
  value,
  onChange,
}: timetype) {
  const [error, setError] = React.useState<String | null>();

  const [errorMessage, setErrorMessage] = React.useState<String | null>();
  React.useEffect(() => {
    setErrorMessage(
      error == "minTime" || error === "minDate" ? "Select a valid date" : null
    );
  }, [error]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        sx={{ width: "100%" }}
        label="Set event time"
        minDateTime={dayjs()}
        value={value}
        onError={(newError) => setError(newError)}
        slotProps={{
          textField: {
            helperText: errorMessage,
          },
        }}
        onChange={onChange}
        timezone="system"
      />
    </LocalizationProvider>
  );
}
