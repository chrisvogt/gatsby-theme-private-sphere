/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { getPosts } from '../hooks/use-recent-posts'

import Footer from '../components/footer'
import Header from '../components/header'
import Layout from '../components/layout'
import PostCard from '../components/widgets/blog/post-card'

export default ({ data }) => {
  const posts = getPosts(data)
  return (
    <Layout>
      <Helmet>
        <title>Blog</title>
        <meta name='description' content='Recent articles from my blog.' />
      </Helmet>
      <Header swoopFill={'white'} styles={{ py: 2 }}>
        <Container>
          <h1>Blog Posts</h1>
        </Container>
      </Header>
      <Container sx={{ flexGrow: 1 }}>
        <Styled.div
          sx={{
            display: `grid`,
            gridAutoRows: `1fr`,
            gridGap: 4,
            gridTemplateColumns: [``, ``, `repeat(2, 1fr)`]
          }}
        >
          {posts.map(post => (
            <PostCard
              createdAt={post.frontmatter.date}
              excerpt={post.excerpt}
              key={post.fields.id}
              link={post.fields.slug}
              title={post.frontmatter.title}
            />
          ))}
        </Styled.div>
      </Container>
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query QueryRecentPosts {
    allMdx {
      edges {
        node {
          fields {
            slug
            id
          }
          frontmatter {
            banner
            categories
            date
            description
            slug
            title
          }
          excerpt(pruneLength: 255)
        }
      }
    }
  }
`
