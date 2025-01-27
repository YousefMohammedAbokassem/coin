"use client";
import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown ";
import { ArrowDropDown, ArrowLeft } from "@mui/icons-material";
import DropdownSideBar from "./DropdownSideBar";

const SideBarItems = ({
  items,
  depthLevel,
  myDepth,
  setMyDepth,
  showNavFun,
  lng,
}) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  //   const onMouseEnter = (e) => {
  //     setMyDepth(depthLevel + 1);
  //     console.log(myDepth);
  //     setDropdown(true);
  //   };

  const onMouseLeave = (e) => {
    setDropdown(false);
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  useEffect(() => {
    // setDepthLevelState(depthLevelState + 1);
    const ul = document.querySelector(".mobileNavParent");
    // uls.forEach((ul, i) => {
    ul.style.cssText = `right:${-myDepth * 200}px !important`;
    // });
    // console.log(uls);
  }, [myDepth]);
  return (
    <li
      className={`w-full ${
        depthLevel >= 1 ? "li_afterOne" : "LiOneMobile"
      } li_one ${dropdown ? "active" : ""}`}
      ref={ref}
      // onClick={(e) => {
      //   setMyDepth(depthLevel + 1);
      //   // const
      //   // console.log(e.target.parentElement.parentElement);
      // }}
      //   onMouseLeave={onMouseLeave}
      //   onClick={closeDropdown}
    >
      {items.subs.length > 0 ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            // className={`buttonDepth${depthLevel}`}
            onClick={(e) => {
              setDropdown((prev) => !prev);
              setMyDepth(depthLevel + 1);
              let siblings = [],
                previousSiblings =
                  e.currentTarget.parentElement.previousElementSibling;
              while (previousSiblings) {
                siblings.push(previousSiblings);
                previousSiblings = previousSiblings.previousElementSibling;
              }
              let nextSiblings =
                e.currentTarget.parentElement.nextElementSibling;
              while (nextSiblings) {
                siblings.push(nextSiblings);
                nextSiblings = nextSiblings.nextElementSibling;
              }
              // console.log(e.currentTarget.parentElement.parentElement);
              // const next = e.currentTarget.parentElement.nextElementSibling;
              // const prev = e.currentTarget.parentElement.previousElementSibling;
              // console.log(siblings);
              // console.log(e.currentTarget.parentElement);
              siblings.forEach((ele) => {
                ele.style.zIndex = "0";
              });
              e.currentTarget.parentElement.style.zIndex = "1000";
              // e.target.parentElement.parentElement;
              // #######
              // const ula = document.querySelector(`.ulDepth`);
              // const ul = document.querySelector(`.ulDepth${depthLevel}`);
            }}
            className={`${
              lng === "he" ? "flex-row-reverse" : ""
            } w-full flex items-center justify-between buttonDepth buttonDepth custom-main-font ${depthLevel}`}
          >
            <ArrowLeft />
            {items.name}
          </button>
          <DropdownSideBar
            depthLevel={depthLevel}
            submenus={items.subs}
            dropdown={dropdown}
            classUl={`ulDepth ulDepth${depthLevel}`}
            myDepth={myDepth}
            setMyDepth={setMyDepth}
            lng={lng}
          />
        </>
      ) : (
        <>
          <a
            href={`/collections?id=${items.id}&category_name=${items.name}`}
            className={`w-full flex custom-main-font ${
              lng === "he" ? "justify-start" : "justify-end"
            }`}
            onClick={showNavFun}
          >
            {items.name}
          </a>
        </>
      )}
    </li>
  );
};

export default SideBarItems;
