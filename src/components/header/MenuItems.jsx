"use client";
import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown ";
import { ArrowDropDown, ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MenuItems = ({ items, depthLevel, status, lng }) => {
  const router = useRouter();
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
  const onMouseEnter = (e) => {
    setDropdown(true);
    // console.log('first')
    // if (depthLevel >= 1) {
    //   const firstUl = document.querySelector(".desktop-nav .dropdown");
    //   firstUl.style.overflow = "visible";
    // }

    const li = e.currentTarget;
    const ulChildren = li.querySelector("ul");
    if (ulChildren !== null) {
      const lisChildren = ulChildren.children;
      const lisArray = Array.from(lisChildren);
      let count = 0;
      const height = lisArray.forEach((li) => {
        count += li.offsetHeight;
      });
      ulChildren.style.cssText = `height: ${count + 40}px; overflow:visible;${
        status ? `left:100%;` : "right:100%;"
      } `;
      if (status) {
        const buttons = document.querySelectorAll(".buttonsNested");
        buttons.forEach((button) => {
          button.style.cssText = `display:flex; flex-direction:row-reverse;`;
        });
      } else {
        const buttons = document.querySelectorAll(".buttonsNested");
        buttons.forEach((button) => {
          button.style.cssText = ``;
        });
      }
      // // console.log(count);
    }
  };
  const onMouseLeave = (e) => {
    // if (depthLevel >= 1) {
    //   const firstUl = document.querySelector(".desktop-nav .dropdown");
    //   firstUl.style.cssText = "overflow:hidden";
    // }
    setDropdown(false);
    const li = e.currentTarget;
    const ulChildren = li.querySelector("ul");
    if (ulChildren !== null) {
      // // console.log(count);
      ulChildren.style.cssText = `height:${0}px`;
    }
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  const handleClick = (e) => {
    // e.stopPropagation
    setDropdown((prev) => !prev);
    // router.push(`/collections?id=${items.id}&category_name=${items.name}`);
  };

  return (
    // <Link href={`/collections?id=${items.id}&category_name=${items.name}`}>
      <li
        className={`menu-items ${
          depthLevel >= 1 ? "li_afterOne " : ""
        } li_one ${dropdown ? "active" : ""}`}
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        // onClick={closeDropdown}
        >
        {items.subs.length > 0 ? (
          <>
            {/* <Link
              href={`/collections?id=${items.id}&category_name=${items.name}`}
              > */}
              <button
                // onMouseEnter={console.log('first')}
                type="button"
                aria-haspopup="menu"
                aria-expanded={dropdown ? "true" : "false"}
                className="w-full flex items-center justify-between buttonsNested custom-main-font"
                // onClick={()=>console.log('first')}
                onClick={handleClick}
                >
                {depthLevel > 0 ? (
                  status ? (
                    <ArrowRight />
                  ) : (
                    <ArrowLeft />
                  )
                ) : (
                  <ArrowDropDown />
                )}
                {items.name}
              </button>
            
            <Dropdown
              depthLevel={depthLevel}
              submenus={items.subs}
              dropdown={dropdown}
              status={status}
            />
          </>
        ) : (
          <>
            <Link
              href={`/collections?id=${items.id}&category_name=${items.name}`}
              className="w-full block custom-main-font"
              onClick={(prev) => showNavFun(!prev)}
            >
              {items.name}
            </Link>
          </>
        )}
      </li>
  );
};

export default MenuItems;
