"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#111",
  },
  "& .MuiRating-iconHover": {
    color: "#666",
  },
});

const Review = ({ expanded, handleChange }) => {
  const [review, setReview] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {" "}
          <Typography sx={{ margin: "auto" }}>Review</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" sx={{ color: "gray" }}>
            Rating
          </Typography>
          <StyledRating
            name="simple-controlled"
            value={review}
            color="black"
            size="small"
            onChange={(event, newValue) => {
              setReview(newValue);
            }}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Review;
