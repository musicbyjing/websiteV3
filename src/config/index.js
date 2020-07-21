module.exports = {
  author: "Jing Liu",
  siteTitle: "Jing Liu | Student, Developer, Creator",
  siteShortTitle: "Jing Liu", // Used as logo text in header, footer, and splash screen
  siteDescription:
    "A modern one-page portfolio with a clean yet expressive design.",
  siteUrl: "https://musicbyjing.com",
  siteLanguage: "en_US",
  siteIcon: "src/content/favicon.png", // Relative to gatsby-config file

  splashScreen: false, // Set this to true if you want to use the splash screen

  // There are icons available for the following platforms:
  // Medium, GitHub, LinkedIn, XING, Behance
  socialMedia: [
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/musicbyjing/",
    },
    {
      name: "Github",
      url: "https://github.com/musicbyjing",
    },
  ],

  navLinks: {
    menu: [
      {
        name: "About",
        url: "/#about",
      },
      {
        name: "Projects",
        url: "/#projects",
      },
    ],
  },

  footerLinks: [
    {
      name: "© 2020 Jing Liu. Photograph by Vivian Chu.",
    },
  ],
}
