"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";
import MenuItems from "./MenuItems";
import SideBarItems from "./SideBarItems";
import Dropdown from "./Dropdown ";
import { ArrowDropDown, ArrowLeft } from "@mui/icons-material";
import EastIcon from "@mui/icons-material/East";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { Box, Drawer } from "@mui/material";
const Navbar = ({ categories, showNavBar, setShowNavBar, showNavFun, lng }) => {
  const router = useRouter();
  let depthLevel = 0;
  const [dropdown, setDropdown] = useState(false);
  const [myDepth, setMyDepth] = useState(0);

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
  const [status, setStatus] = useState(true);

  const [eventEnter, setEventEnter] = useState(0);
  const onMouseEnter = (e) => {
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
    //
    if (e.pageX <= document.documentElement.clientWidth / 2) {
      setStatus(true);
    } else {
      setStatus(false);
    }

    setDropdown(true);
    if (depthLevel >= 1) {
      const firstUl = document.querySelectorAll(".desktop-nav .dropdown");
      firstUl.forEach((element) => {
        element.style.overflow = "visible";
      });
    }
    const li = e.currentTarget;
    const ulChildren = li.querySelector("ul");
    if (ulChildren !== null) {
      const lisChildren = ulChildren.children;
      const lisArray = Array.from(lisChildren);
      let count = 0;
      const height = lisArray.forEach((li) => {
        count += li.offsetHeight;
      });
      ulChildren.style.cssText = `height: ${count + 40}px; overflow:visible;`;
      // // console.log(count);
    }
  };

  const onMouseLeave = (e) => {
    setDropdown(false);
    const li = e.currentTarget;
    const ulChildren = li.querySelector("ul");
    if (ulChildren !== null) {
      // // console.log(count);
      ulChildren.style.cssText = `height:${0}px;`;
    }
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  const handleClick = (items) => {
    // setDropdown((prev) => !prev)
    // console.log('first')
    router.push(`/collections?id=${items.id}&category_name=${items.name}`)
  };

  return (
    <>
      <nav className="lg:border-t lg:border-b py-1 max-h-12 flex items-center uppercase desktop-nav z-50 relative">
        <ul className="relative z-50 hidden lg:flex justify-around items-center gap-4 container mx-auto uppercase menus">
          {categories.map((items, index) => (
            <Fragment key={index}>
              <li
                className={`menu-items ${
                  depthLevel >= 1 ? "li_afterOne" : ""
                } li_one ${dropdown ? "active" : ""}`}
                ref={ref}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => handleClick(items)}
              >
                {items.subs.length > 0 ? (
                  <>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={dropdown ? "true" : "false"}
                      onClick={() => handleClick(items)}
                      className="w-full flex items-center justify-between custom-main-font"
                    >
                      {items.name}
                      {depthLevel > 0 ? <ArrowLeft /> : <ArrowDropDown />}
                    </button>
                    <Dropdown
                      depthLevel={depthLevel}
                      submenus={items.subs}
                      dropdown={dropdown}
                      setShowNavBar={setShowNavBar}
                      status={status}
                      // leftOrRight={leftOrRight}
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
            </Fragment>
          ))}
        </ul>
        <div
          className={`fixed block lg:hidden top-0 h-screen w-[200px]  myTransition ${
            !showNavBar
              ? `${lng === "he" ? "right-0" : "left-0"}`
              : `${lng === "he" ? "-right-[100%]" : "-left-[100%]"}`
          } `}
        >
        {/* <Drawer open={!showNavBar} onClose={() => setShowNavBar(true)}> */}
          <div className={`fixed bg-[#fbfbfb]  top-0 h-screen w-[200px]`}>
          {/* <Box width="300px" sx={{ p: 2 }}> */}
            <button
              type="button"
              className="relative outline-none flex w-full p-[10px] border-b border-b-solid border-b-[#e5e5e5]"
            >
              {myDepth !== 0 ? (
                <span
                  onClick={() => {
                    if (myDepth > 0) {
                      setMyDepth(myDepth - 1);
                    }
                  }}
                >
                  <EastIcon />
                </span>
              ) : (
                <span>
                  <CloseIcon onClick={(prev) => showNavFun(!prev)} />
                </span>
              )}
            </button>
            <div
              className={`divSideBar myTransition fixed bg-black  block lg:hidden  overflow-hidden top-[65px] w-[200px] h-screen ${
                !showNavBar
                  ? `${lng === "he" ? "right-0" : "left-0"}`
                  : `${lng === "he" ? "-right-[100%]" : "-left-[100%]"}`
              }`}
            >
              <ul className=" flex justify-between items-center gap-4 container mx-auto uppercase mobileNavParent  mobile-nav right-0">
                {categories.map((menu, index) => (
                  <SideBarItems
                    key={index}
                    items={menu}
                    depthLevel={depthLevel}
                    myDepth={myDepth}
                    setMyDepth={setMyDepth}
                    showNavFun={showNavFun}
                    lng={lng}
                  />
                ))}
              </ul>
            </div>
            </div>
          {/* </Box>
        </Drawer> */}
        </div>

        <div
          className={`fixed top-0 block lg:hidden h-screen w-full bg-[#14141450] -z-10 myTransition ${
            !showNavBar
              ? `${lng === "he" ? "right-0" : "left-0"}`
              : `${lng === "he" ? "-right-[100%]" : "-left-[100%]"}`
          }`}
          onClick={(prev) => showNavFun(!prev)}
        ></div>
      </nav>
    </>
  );
};

export default Navbar;
