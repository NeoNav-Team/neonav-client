import { userProfile } from './src/services/user'; 

//source data for nodes
exports.createPages = async ({ actions: { createPage } }) => {
    const profile = await userProfile();

    createPage({
        path: `/profile`,
        component: require.resolve('./src/templates/profile.js'),
        context: { profile }
      });
  }