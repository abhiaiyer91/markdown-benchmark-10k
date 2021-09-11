const NUM_PAGES = parseInt(process.env.NUM_PAGES2 || 5000, 10)
const template = require(`./page-template`)

exports.sourceNodes = ({ actions: { createNode, createNodeField } }) => {
  // Create markdown nodes
  for (let step = 0; step < NUM_PAGES; step++) {
    const id = step.toString()

    const content = template(step)

    createNode({
      id: step.toString(),
      parent: null,
      children: [],
      slug: `/path/${id}/`,
      title: `Page ${id}`,
      uuid: step,
      internal: {
        type: `FakeMarkdown`,
        mediaType: `text/markdown`,
        content,
        contentDigest: step.toString(),
      },
    })
  }
}

exports.createPages = ({ actions: { createPage } }) => {
  let pages = []
  let step
  for (step = 0; step < NUM_PAGES; step++) {
    const page = {
      path: `/path/${step}/`,
      component: require.resolve(`./src/templates/blank.js`),
      context: {
        id: step.toString(),
      },
      defer: true
    }
    createPage(page)
    pages.push(page)
  }

  const postsPerPage = 25
  const numPages = pages.length

  let counter = 0

  Array.from({ length: numPages }).forEach((_, index) => {
    counter += postsPerPage
    if (counter <= numPages) {
      createPage({
        path: index === 0 ? `/blog/` : `/blog/${index + 1}`,
        component: require.resolve('./src/templates/blog.js'),
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages,
          currentPage: index + 1
        }
      })
    }
  })
}
