/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  /* Your site config here */
  plugins: [
    {  resolve: `gatsby-plugin-react-helmet`
    },
    {
      resolve: `gatsby-plugin-antd`,
      options: {
        style: true
      }
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: getThemeVariables({
                        dark: true, // 开启暗黑模式
                        compact: true, // 开启紧凑模式
          }),
        }
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`
    }
  ]
}
