import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
  import RedoIcon from "@mui/icons-material/Redo";
  
  import React from "react";

const ShipmentAndReturn = ({expanded, handleChange}) => {
  return (
    <div >
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="shipments-and-returns"
          id="shipments-and-returns"
        >
          <Typography sx={{margin: "auto"}}>SHIPMENTS AND RETURNS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="list-disc px-4">
            <li>
              <Typography variant="body1" sx={{ color: "gray" }}>
                You can choose delivery with a courier to your home, throughout
                the country, with an additional NIS 30. The delivery fee will be
                added to the cost of the order at the time of payment.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ color: "gray" }}>
                For orders over NIS 450, the shipping is on us! Does not include
                products with unusual sizes that are explicitly stated in the
                product description as having an additional shipping cost.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ color: "gray" }}>
                Your order will reach you within 5 to 7 business days after
                placing the order. In cases where it is a particularly remote
                location, remote kibbutzim and moshavim, there may be delivery
                times of up to 7 business days.
              </Typography>
            </li>
            <li>
              <Typography
                variant="body1"
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                Delays in delivery times may occur on sales days, end-of-season
                sales and special sales (such as Black Friday, Cyber ​​Monday,
                etc.).
              </Typography>
            </li>
          </ul>
          <AccountBalanceIcon />
          <Typography variant="h6">Pickup</Typography>
          <ul className="list-disc px-4">
            <li>
              <Typography variant="body1" sx={{ color: "gray" }}>
                live close Jumping to Tel Aviv? Great, wed love to see you! You
                can pick up the order from the logistics center at 43 Lavanda
                St., Tel Aviv. The order will be ready for collection up to two
                days from the day of the order, we will in any case notify you
                by email when it is ready.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                Please note - the collection date must be arranged in advance by
                phone: 03-6035076
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ color: "gray" }}>
                And what about parking? If you are short on time and parking,
                you can stop in front of the store and we will deliver the order
                to your car! Just let us know by phone (03-6035076) when you
                arrive so we can prepare for you.
              </Typography>
            </li>
          </ul>
          <Typography variant="h6" sx={{ color: "gray", mt: 4 }}>
            <RedoIcon />
            Returns, exchanges and credits
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "gray", fontWeight: "bold" }}
          >
            Not satisfied with what you chose? No problem!
          </Typography>
          <ul className="list-disc px-4">
            <li>
              <Typography variant="body1" sx={{ color: "gray" }}>
                Any product can be returned or exchanged easily, without
                questions, and against a monetary credit within 14 days from the
                actual receipt of the item.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ color: "gray" }}>
                For the full conditions for returning an item and how to return
                it, or exchange an item for another item, see <a href="" className="underline">Shipping and
                returns policyour full</a>
              </Typography>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default ShipmentAndReturn