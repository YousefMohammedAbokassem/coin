"use client";
import { faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import SliderImage from "../slider/SliderImage";
import FilterDrawer from "./filter/FilterDrawer";
import Link from "next/link";
import CollectionLoader from "../CollectionLoader";
import axios from "axios";
import { useSession } from "next-auth/react";

const ProductsComp = ({bestSellers,  id, category_name }) => {
  const session = useSession();
  const [isActive, setIsAvtive] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);

  const [selectedId, setSelectedId] = useState(id);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fetchingData, setFetchingData] = useState(true); // New state variable

  const [loader, setLoader] = useState(false);

  const [value, setValue] = useState([0, 100000]);

  const [sort, setSort] = useState("");

  const [brand, setBrand] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setLoader(true);
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }user/products?category_id=${selectedId}&page=1${
          value[0] !== 0 ? `&low_price=${value[0]}` : ""
        } ${value[1] !== 100000 ? `&high_price=${value[0]}` : ""}${
          sort !== "" ? `&${sort}` : ""
        }${selectedBrand !== null ? `&brand_id=${selectedBrand}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${session?.data?.user?.token}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.products);
        setLoading(false);
        setLoader(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [selectedId, value, sort, selectedBrand]);

  const handleSort = (e) => {
    setSort(e.target.dataset.sort);
    setFetchingData(true);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}user/brands`, {
        headers: {
          Authorization: `Bearer ${session?.data?.user?.token}`
          // Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      })
      .then((res) => {
        setBrand(res.data.brands);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container mx-auto mt-4">
        <h6 className="text-gray-400">
          <Link href="/">/ Home</Link>/ {category_name}
        </h6>
        <h2 className="font-medium text-2xl text-center mt-8 capitalize">
          {category_name}
        </h2>
        <div className="flex justify-between items-center mt-8 absolute relative">
          <div
            className={`sort contentBx ${isActive ? "activeFooter" : ""}`}
            onMouseEnter={() => setIsAvtive(true)}
            onMouseLeave={() => setIsAvtive(false)}
          >
            <div className="w-[100px] flex justify-between items-center text-gray-600 font-medium responcive-h6">
              <h6 className="font-semibold">Sort :</h6>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className="absolute drop-down-sort w-[150px] bg-white z-10 text-center ">
              <div className=" drop-down-sort content flex flex-col">
                {[
                  { id: 1, sort: "A_to_Z" },
                  { id: 2, sort: "low_to_high" },
                  { id: 3, sort: "high_to_low" },
                  { id: 4, sort: "best_seller" },
                ].map((ele) => {
                  return (
                    <div
                      href=""
                      className="text-gray-400 hover:text-black duration-300 cursor-pointer"
                      data-sort={ele.sort}
                      key={ele.id}
                      // onClick={(e) => setSort(e.target.dataset.sort)}
                      onClick={handleSort}
                    >
                      {ele.sort}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            onClick={() => setOpenFilter(true)}
            className="filter flex justify-between items-center gap-4 text-gray-600 font-medium cursor-pointer"
          >
            <FontAwesomeIcon icon={faFilter} />
            <h6 className="font-semibold">Choose Your Own</h6>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 flex-wrap my-12">
          {data.map((element, index) => (
            <Product key={index} data={element} />
          ))}
        </div>
        {data.length && (
          <div>
            <CollectionLoader
              selectedId={selectedId}
              fetchingData={fetchingData}
              setFetchingData={setFetchingData}
              value={value}
              sort={sort}
              selectedBrand={selectedBrand}
            />
          </div>
        )}
        <Divider sx={{ mt: 4, width: "100%" }} />
        <div className="mt-8 text-center">
          <Typography variant="h6" sx={{ fontSize: "26px", my: 4 }}>
            Shop Best Sellers
          </Typography>
          <SliderImage product={bestSellers} />
          <Divider sx={{ mt: 4 }} />
        </div>
      </div>
      <FilterDrawer
        open={openFilter}
        setOpen={setOpenFilter}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        loader={loader}
        setLoader={setLoader}
        fetchingData={fetchingData}
        setFetchingData={setFetchingData}
        value={value}
        setValue={setValue}
        brands={brand}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />
      {loader ? (
        <Box className="flex left-0 top-0 z-[100000] opacity-50 fixed items-center justify-center h-screen w-full bg-white ">
          <CircularProgress />
        </Box>
      ) : null}
    </>
  );
};

export default ProductsComp;

