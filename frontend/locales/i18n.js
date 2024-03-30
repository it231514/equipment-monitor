module.exports = {
  locales: ["en", "de"],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
    "/": ["home"], // app/page.tsx
    "/about": ["home"], // app/about/page.tsx
    "/sensorData": ["home"], // app/sensorData/page.tsx
  },
};
