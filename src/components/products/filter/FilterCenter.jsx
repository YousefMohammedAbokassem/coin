// 'use client'
// import { ExpandMore } from "@mui/icons-material";
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Box,
//   Slider,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";



// const FilterCenter = () => {


//   const [value, setValue] = useState([0, 1500]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const valueLabelFormat = (value) => `${value} NIS`;


//   return (
//     <>
//       <Accordion sx={{boxShadow: "none", borderTop: "none", "::before" : {display: "none"}}}>
//         <AccordionSummary
//           id="filter-center"
//           aria-controls="filter-center-content"
//           expandIcon={<ExpandMore />}
//           sx={{
//             "::before": {
//               display: "none"
//             }}}
//         >
//           <Typography>Price range</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Box sx={{ width: "100%" }}>
//             <Slider
//               getAriaLabel={() => "Price range"}
//               value={value}
//               onChange={handleChange}
//               valueLabelDisplay="auto"
//               sx={{color: "#141414"}}
//               size="small"
//               valueLabelFormat={valueLabelFormat}
//               min={0}
//               max={1500}
//             />
//           </Box>
//         </AccordionDetails>
//       </Accordion>
//     </>
//   );
// };

// export default FilterCenter;





"use client";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const FilterCenter = ({ value, setValue, setFetchingData }) => {

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFetchingData(true)
  };

  const valueLabelFormat = (value) => `${value} NIS`;

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
          id="filter-center"
          aria-controls="filter-center-content"
          expandIcon={<ExpandMore />}
          sx={{
            "::before": {
              display: "none",
            },
          }}
        >
          <Typography>Price range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: "100%" }}>
            <Slider
              getAriaLabel={() => "Price range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              sx={{ color: "#141414" }}
              size="small"
              valueLabelFormat={valueLabelFormat}
              min={0}
              max={100000}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilterCenter;
