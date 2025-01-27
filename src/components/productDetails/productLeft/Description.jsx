import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Description = ({ expanded, handleChange, data }) => {
  return (
    <div className="mt-8">
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="description"
          id="description"
        >
          <Typography sx={{ textTransform: "uppercase", margin: "auto" }}>
            Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography
            variant="body1"
            sx={{
              color: "gray",
              fontSize: "16px",
              borderBottom: "1px solid gray",
              py: 4,
            }}
          >
            Tables made of natural and high-quality mango wood in a stunning
            design! Suitable for central spaces and the living room. Adds a
            natural and fresh feel to any home. Provides a warm and inviting
            atmosphere
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "gray", borderBottom: "1px solid gray", py: 4 }}
          >
            The table is suitable for inside and outside the house , however, it
            is a material that is a little sensitive to the sun, and for this
            reason it is advisable to place wooden furniture in a shaded place
            in the yard/balcony. * The mango tree is a natural material and
            there may be slight changes in shade.
          </Typography>
          <Typography variant="h6" sx={{ color: "h6", fontWeight: "bold" }}>
            Dimensions:
          </Typography>
          <Stack sx={{ borderBottom: "1px solid gray", pb: 4 }}>
            <Typography variant="body1" sx={{ color: "gray", mb: 4 }}>
              Large table: diameter 65 cm | height 45 cm
            </Typography>
            <Typography variant="body1" sx={{ color: "gray" }}>
              Small table: diameter 45 cm | height 52 cm
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ color: "gray" }}>
            The leg and the brace come unassembled, they can be connected easily
            - just a few short minutes of fun!
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "gray", fontWeight: "bold" }}
          >
            The leg and the brace come unassembled, they can be connected easily
            - just a few short minutes of fun!
          </Typography> */}
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              fontSize: "16px",
              // borderBottom: "1px solid gray",
              py: 4,
            }}
          >
            {data.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Description;
