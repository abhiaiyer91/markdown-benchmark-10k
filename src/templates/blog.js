import React from "react"
import { graphql, Link } from "gatsby"

const Index = ({ data, pageContext: { currentPage } }) => {
  const prev = currentPage === 1 ? null : <Link to={`/blog/${currentPage - 1}/`}>Previous</Link>
  const next = <Link to={`/blog/${currentPage + 1}/`}>Next</Link>
  return (
    <main style={{
      margin: '0 auto',
      maxWidth: '80%'
    }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 auto' }}>
        {prev}
        {next}
      </div>
    </main>
  )
}

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