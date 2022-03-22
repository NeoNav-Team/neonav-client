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
            "primary-cyan":`#41c5ff`,
            "primary-magenta":`#ff00a0`,
            "primary-indigo":`#7a04eb`,
            "primary-color": `#fff`,
            "success-color":`#00ff9f`,
            "info-color":`#00b8ff`,
            "warning-color":`#f96363`,
            "error-color":`#ff124f`,
            "highlight-color":`#1afe49`,
            "text-color":`#ffffff`,
            "highlight-color": `#000000`,
            "select-item-selected-color": `#ffffff`,
            "select-item-selected-bg": `#ff00a0`,
            "sselect-clear-background": '#7a04eb',
            "select-item-active-bg": "#7a04eb",
            "border-color-base":`@primary-cyan`,
            "component-background": `rgba(124, 4, 236, 0.75)`,
            "layout-body-background":`transparent`,
            "layout-header-background":`transparent`
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`
    }
  ]
}
