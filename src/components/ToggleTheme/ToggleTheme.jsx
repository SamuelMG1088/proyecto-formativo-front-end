import React from "react";
import { IoMoon } from "react-icons/io5";
import { GoSun } from "react-icons/go";

const ToggleTheme = ({ theme, setTheme }) => {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="toggle-theme-btn"
      title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === "dark" ? (
        <GoSun size={22} color="var(--color-button-text)" />
      ) : (
        <IoMoon size={22} color="var(--color-text)" />
      )}
    </button>
  );
};

export default ToggleTheme;
