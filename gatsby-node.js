const NUM_PAGES = parseInt(process.env.NUM_PAGES2 || 5000, 10)
const template = require(`./page-template`)

exports.sourceNodes = ({ actions: { createNode, createNodeField } }) => {
  // Create markdown nodes
  for (let step = 0; step < NUM_PAGES; step++) {
    const id = step.toString()
  
    createNode({
      id: step.toString(),
      parent: null,
      children: [],
      slug: `/path/${id}/`,
      title: `Page ${id}`,
      internal: {
        type: `FakeMarkdown`,
        mediaType: `text/markdown`,
        content: template(step),
        contentDigest: step.toString(),
      },
    })
  }
}

exports.createPages = ({ actions: { createPage } }) => {
  let step
  for (step = 0; step < NUM_PAGES; step++) {
    createPage({
      path: `/path/${step}/`,
      component: require.resolve(`./src/templates/blank.js`),
      context: {
        id: step.toString(),
      },
      defer: true
    })
  }
}
