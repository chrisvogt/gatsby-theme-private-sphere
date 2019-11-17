/** @jsx jsx */
import { Container, jsx, Flex, Styled } from 'theme-ui'

import Footer from '../components/footer'
import GitHub from '../components/widgets/github'
import Goodreads from '../components/widgets/goodreads'
import Header from '../components/header'
import Instagram from '../components/widgets/instagram'
import Layout from '../components/layout'
import Posts from '../components/widgets/blog/posts'

import { getAvatarURL, getHeadline, getSubhead } from '../selectors/metadata'

const HomeTemplate = props => {
  const { data: { site: { siteMetadata = {} } = {} } = {} } = props

  const avatar = getAvatarURL(siteMetadata)
  const headline = getHeadline(siteMetadata)
  const subhead = getSubhead(siteMetadata)

  return (
    <Layout>
      <Header>
        <div
          sx={{
            display: [`block`, ``, `grid`],
            gridGap: 0,
            gridTemplateColumns: [``, ``, `1fr 60%`],
            width: `100%`
          }}
        >
          <Flex
            sx={{
              flexDirection: `column`,
              alignItems: [`center`, ``, `flex-end`]
            }}
          >
            <img
              sx={{
                borderColor: `white`,
                borderRadius: `50%`,
                borderStyle: `solid`,
                borderWidth: 3,
                mr: [0, 0, 3]
              }}
              alt='Avatar'
              src={avatar}
              height='128'
              width='128'
            />
          </Flex>
          <Flex
            sx={{
              textAlign: [`center`, ``, `left`],
              flexDirection: `column`,
              justifyContent: `center`
            }}
          >
            <Styled.h1 sx={{ mb: 0 }}>{headline}</Styled.h1>
            <Styled.p sx={{ py: 0, my: 0, fontSize: 2 }}>{subhead}</Styled.p>
          </Flex>
        </div>
      </Header>

      <div
        sx={{
          backgroundColor: `colors.background`,
          minHeight: `500px`,
          pt: 4
        }}
      >
        <Container>
          <Posts />
          <Instagram />
          <GitHub />
          <Goodreads />
        </Container>
      </div>
      <Footer />
    </Layout>
  )
}

export default HomeTemplate
