  import React from "react";
  import { IoMoon } from "react-icons/io5";
  import { GoSun } from "react-icons/go";
  import { useTheme } from "next-themes";

  const ToggleTheme = () => {
    const { theme, setTheme } = useTheme();

    if (!theme) return null; // Evita renderizar antes de que monte el tema

    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="toggle-theme-btn"
        aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
      >
        {theme === "dark" ? (
          <GoSun size={22} className="text-yellow-400" />
        ) : (
          <IoMoon size={22} className="text-gray-700" />
        )}
      </button>
    );
  };

  export default ToggleTheme;
