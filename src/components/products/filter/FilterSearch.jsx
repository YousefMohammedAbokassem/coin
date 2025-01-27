"use client";
import React, { useState } from "react";

const FilterSearch = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="search"
        name=""
        id=""
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default FilterSearch;
