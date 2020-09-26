/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
          modifyVars: {
            "primary-cyan":`#41C5FF`,
            "primary-magenta":`#ff00a0`,
            "primary-indigo":`#7a04eb`,
            "primary-color": `#fff`,
            "success-color":`#00ff9f`,
            "info-color":`#00b8ff`,
            "warning-color":``,
            "error-color":``,
            "highlight-color":``,
            "text-color":`#fff`,
            "border-color-base":`@primary-cyan`,
            "component-background": `rgba(124, 4, 236, 0.75)`
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`
    }
  ]
}
