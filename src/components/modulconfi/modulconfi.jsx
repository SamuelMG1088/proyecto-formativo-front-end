// src/config/modulesConfig.js
const modulesConfig = {
  Empresa: [
    { id: "home", title: "navbar.home", link: "/home" },
    { id: "listado-programas", title: "navbar.training", link: "/ListProgram" },
    { id: "diagnosis", title: "navbar.diagnosis", link: "/businessdiagnosis" },
    { id: "profile", title: "navbar.profile", link: "/viewprofile" },
    { 
      id: "logout", 
      title: "navbar.logout", 
      action: () => {
        localStorage.removeItem("token");   // Limpia token
        window.location.href = "/";    // Redirige al login
      } 
    },
  ],

  Admin: [
    { id: "home", title: "navbar.home", link: "/home" },
    { id: "usuario", title: "navbar.users", link: "/listcompany" },
    { 
      id: "listprogram", 
      title: "navbar.training", 
      link: "/ListProgram",
      subModules: [
        { id: "createProgram", title: "Crear Programa", link: "/createProgram" },
      ]
    },
    { id: "diagnosis", title: "navbar.diagnosis", link: "/businessdiagnosis" },
    { id: "profile", title: "navbar.profile", link: "/viewprofile" },
    { 
      id: "logout", 
      title: "navbar.logout", 
      action: () => {
        localStorage.removeItem("token");
        window.location.href = "/";
      } 
    },
  ],
};

export default modulesConfig;
