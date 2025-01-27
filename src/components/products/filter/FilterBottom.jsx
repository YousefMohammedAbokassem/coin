import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const FilterBottom = ({ data, selectedBrand, setSelectedBrand }) => {
  const handleCheckboxChange = (id) => {
    if (selectedBrand === id) {
      setSelectedBrand(null);
    } else {
      setSelectedBrand(id);
    }
  };

  return (
    <>
      <Accordion
        sx={{
          boxShadow: "none",
          borderTop: "none",
          "::before": { display: "none" },
        }}
      >
        <AccordionSummary
          id="filter-bottom"
          aria-controls="filter-bottom-content"
          expandIcon={<ExpandMore />}
          sx={{
            "::before": {
              display: "none",
            },
          }}
        >
          <Typography>Brands</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data.map((element, index) => (
            <Stack
              key={index}
              direction="row"
              sx={{ justifyContent: "end", alignItems: "center" }}
            >
              <Typography variant="body1" sx={{ fontSize: "12px" }}>
                {element.name}
                <Checkbox
                  checked={selectedBrand === element.id}
                  // checked={false}
                  onChange={() => handleCheckboxChange(element.id)}
                />
              </Typography>
            </Stack>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilterBottom;
