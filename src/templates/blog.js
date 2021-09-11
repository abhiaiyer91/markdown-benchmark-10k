import React from "react"
import { graphql, Link } from "gatsby"

const Index = ({ data }) => (
  <main>
    <h1>Hello World!</h1>
    <ul>
      {
        data.allFakeMarkdown.nodes.map(node => (
          <li key={node.slug}>
            <Link to={node.slug}>{node.title}</Link>
          </li>
        ))
      }
    </ul>
  </main>
)

export const indexQuery = graphql`
  query BlogPage($skip: Int!, $limit: Int!) {
    allFakeMarkdown(
      sort: { fields: [uuid], order: ASC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        slug
        title
      }
    }
  }
`

export default Index