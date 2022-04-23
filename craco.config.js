const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@purple-base": "#7B5E7B",
              "@blue-base": "#5AA9E6",
              "@cyan-base": "#1AFFD5",
              "@green-base": "#548687",
              "@pink-base": "#FFA5A5",
              "@lime-base": "#94FBAB",
              "@red-base": "#EF546F",
              "@orange-base": "#EF8354",
              "@yellow-base": "#FFEC51",
              "@volcano-base": "#FF7477",
              "@magenta-base": "#A04072",
              "@geekblue-base": "#1865A0",
              "@gold-base": "#F9A03F",
              "@my-linen": "#F5E9E2",

              "@primary-color": "@green-base",
              "@body-background": "@my-linen",
              "@component-background": "@my-linen",
              "@normal-color": "#F5E9E2",
              "@border-radius-base": "5px",
              "@black": "#0B0014",
              "@item-hover-bg": "#0B001410",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
