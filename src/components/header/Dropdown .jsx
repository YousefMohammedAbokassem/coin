"use client";
import React, { useEffect, useState } from "react";
import MenuItems from "./MenuItems";

const Dropdown = ({
  submenus,
  dropdown,
  depthLevel,
  status,
  setShowNavBar,
}) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <>
      <ul
        className={`dropdown rounded-md toRightLeft flex flex-col justify-center ${dropdownClass} ${
          dropdown ? `show ` : ""
        } `}
      >
        {submenus.map((submenu, index) => (
          <MenuItems
            items={submenu}
            key={index}
            depthLevel={depthLevel}
            status={status}
            setShowNavBar={setShowNavBar}
          />
        ))}
      </ul>
    </>
  );
};

export default Dropdown;
