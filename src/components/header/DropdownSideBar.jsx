"use client";
import React, { useEffect } from "react";
import SideBarItems from "./SideBarItems";

const DropdownSideBar = ({
  submenus,
  dropdown,
  depthLevel,
  myDepth,
  setMyDepth,
  classUl,
  lng,
}) => {
  //   const [depthLevelState, setDepthLevelState] = useState(depthLevel + 1);
  useEffect(() => {
    // setDepthLevelState(depthLevelState + 1);
    const ul = document.querySelector(".mobileNavParent");
    // uls.forEach((ul, i) => {
    ul.style.cssText = `right:${-myDepth * 200}px`;
    // });
    // console.log(uls);
  }, [myDepth]);
  depthLevel = depthLevel + 1;
  let dropdownClass = depthLevel >= 1 ? `left-[${depthLevel}00%]` : "left-0";
  //   console.log(depthLevel);
  //     const uls = document.querySelectorAll(".mobile-nav");

  return (
    <>
      <ul
        className={`        
        flex flex-col justify-center mobile-nav gap-4 ${classUl}`}
        // style={{ left: `${depthLevel + myDepth}00%` }}
      >
        {submenus.map((submenu, index) => (
          <SideBarItems
            items={submenu}
            key={index}
            depthLevel={depthLevel}
            myDepth={myDepth}
            setMyDepth={setMyDepth}
            lng={lng}
          />
        ))}
      </ul>
    </>
  );
};

export default DropdownSideBar;
