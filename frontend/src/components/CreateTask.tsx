import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Taskform from "./Taskform";

const CreateTask = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ bgcolor: "#A0A0A0" }}
      >
        <Typography fontSize={"20px"} color={"blue"}>
          Create
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Taskform />
      </AccordionDetails>
    </Accordion>
  );
};

export default CreateTask;
