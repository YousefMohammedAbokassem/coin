import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const ProductCardComponent = ({ element }) => {
  return (
    <>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${element.product.image}`}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {element.product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {element.product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Amount: {element.amount}
          </Typography>
          {element.old_price === element.new_price ? (
            <Typography>Price: {element.old_price}</Typography>
          ) : (
            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-start",
                alignItem: "center",
                gap: "20px",
              }}
            >
              <Typography>
                Price:{" "}
                <span
                  style={{ textDecoration: "line-through", fontSize: "12px" }}
                >
                  {element.old_price}
                </span>
              </Typography>
              <Typography>{element.new_price}</Typography>
            </Stack>
          )}
          {element.product.attributes.map((element, index) => (
            <div key={index} className="flex justify-between items-center space-y-3">
              <Typography variant="h6">{element.attribute}: </Typography>
              <button disabled className="px-2 py-1 text-[20px] flex justify-center items-center bg-white text-gray-400 border border-gray-900 uppercase">{element.value}</button>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCardComponent;
