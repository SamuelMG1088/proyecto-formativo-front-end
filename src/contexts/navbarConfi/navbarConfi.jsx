const navConfig = {
  empresa: [
    {
      id: "home",
      title: "navbar.home",
      link: "/home",
    },
    {
      id: "programa-formacion",
      title: "navbar.viewTraining",
      link: "/ViewTraining/:id",
    },
    {
      id: "listado-programas",
      title: "navbar.trainingList",
      link: "/ListProgram",
    },
    {
      id: "diagnosis",
      title: "navbar.diagnosis",
      link: "/businessdiagnosis",
    },
    {
      id: "profile",
      title: "navbar.profile",
      link: "/viewprofile",
    },
  ],

  admin: [
    {
      id: "listcompany",
      title: "navbar.users",
      link: "/listcompany",
    },
    {
      id: "listado-programas",
      title: "navbar.training",
      link: "/ListProgram",
    },
    {
      id: "diagnosis",
      title: "navbar.diagnosis",
      link: "/businessdiagnosis",
    },
    {
      id: "profile",
      title: "navbar.profile",
      link: "/viewprofile",
    },
  ],
};

export default navConfig;
