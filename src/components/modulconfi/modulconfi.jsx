// src/config/modulesConfig.js
const modulesConfig = {
  Empresa: [
    { id: "home", title: "navbar.home", link: "/home" },
    { id: "listado-programas", title: "navbar.training", link: "/ListProgram" },
    { id: "diagnosis", title: "navbar.diagnosis", link: "/businessdiagnosis" },
    { id: "profile", title: "navbar.profile", link: "/viewprofile" },
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
  ],
};

export default modulesConfig;
