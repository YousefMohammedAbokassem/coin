"use cleint";
import { getNavbar } from "@/lib/getNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const FilterTop = ({ setSelectedId, selectedId, loader, setLoader, setFetchingData, fetchingData }) => {
  const session = useSession()
  const [data, setData] = useState([]);



  const fetchCategories = async () => {
    setLoader(true);
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}user/categories`, {
      headers: {
        Authorization: `Bearer ${session?.data?.user?.token}`
      }
    })
    .then(res => {
      setLoader(false)
      setData(res.data.categories)
    })
    .catch(error => {
      console.log(error)
      setLoader(false)
    })
  };



  const handleCheckboxChange = (id) => {
    setSelectedId(id);
    setFetchingData(true)
  };


  useEffect(() => {
    fetchCategories();
  }, []);
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
          id="filter-top"
          aria-controls="filter-top-content"
          expandIcon={<ExpandMore />}
          sx={{
            "::before": {
              display: "none",
            },
          }}
        >
          <Typography>Collection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data.map((element, index) => {
            if (element.subs.length) {
              return (
                <Accordion
                  key={index}
                  sx={{
                    boxShadow: "none",
                    borderTop: "none",
                    "::before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    id="filter-sub"
                    aria-controls="filter-content-sub"
                    expandIcon={<ExpandMore />}
                    sx={{
                      "::before": {
                        display: "none",
                      },
                      flexDirection: "row-reverse",
                      justifyContent: "end",
                      p: 0,
                    }}
                    classes="sub-accordion"
                  >
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "end", alignItems: "center" }}
                    >
                      <Typography variant="body1" sx={{ fontSize: "12px" }}>
                        {element.name}
                        <Checkbox
                          checked={selectedId === element.id}
                          onChange={() => handleCheckboxChange(element.id)}
                        />{" "}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    {element.subs.map((sub, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        sx={{ justifyContent: "end", alignItems: "center" }}
                      >
                        <Typography variant="body1" sx={{ fontSize: "12px" }}>
                          {sub.name}
                          <Checkbox
                            checked={selectedId === sub.id}
                            onChange={() => handleCheckboxChange(sub.id)}
                          />
                        </Typography>
                      </Stack>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            } else {
              return (
                <Stack
                  key={index}
                  direction="row"
                  sx={{ justifyContent: "end", alignItems: "center" }}
                >
                  <Typography variant="body1" sx={{ fontSize: "12px" }}>
                    {element.name}
                    <Checkbox
                      checked={selectedId === element.id}
                      // checked={false}
                      onChange={() => handleCheckboxChange(element.id)}
                    />
                  </Typography>
                </Stack>
              );
            }
          })}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilterTop;
