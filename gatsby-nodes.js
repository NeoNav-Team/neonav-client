//source data for nodes
exports.createPages = async ({ actions: { createPage } }) => {
    const { createNode } = actions
    // Download data from a remote API.
    const data = await getProfile();
    // Process data and create nodes.using a custom processDatum function
    data.forEach(datum => createNode(processDatum(datum)))
    // You're done, return.
    return
  }
