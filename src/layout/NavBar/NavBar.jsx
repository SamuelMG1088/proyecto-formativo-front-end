import React, { useState } from "react";
import {AiOutlineHome, AiOutlineUser, AiOutlineMessage, AiOutlineCamera, AiOutlineSetting,} from "react-icons/ai";
import './css/navBar.css'
import clsx from "clsx";

const navItems = [
  { label: "Home", icon: AiOutlineHome },
  { label: "User", icon: AiOutlineUser },
  { label: "Chat", icon: AiOutlineMessage },
  { label: "Camera", icon: AiOutlineCamera },
  { label: "Settings", icon: AiOutlineSetting },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={styles.navItem}
            >
              {isActive && <span className={styles.activeCircle}></span>}
              <Icon
                className={clsx(
                  styles.icon,
                  isActive ? styles.iconActive : styles.iconInactive
                )}
              />
              <span
                className={clsx(
                  styles.label,
                  isActive ? styles.labelActive : styles.labelInactive
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
