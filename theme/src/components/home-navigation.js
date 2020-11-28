/** @jsx jsx */
import { Fragment } from 'react'
import { Heading, jsx, useThemeUI, Link } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { Card } from '@theme-ui/components'

import {
  getGithubWidgetDataSource,
  getGoodreadsWidgetDataSource,
  getInstagramWidgetDataSource,
  getSpotifyWidgetDataSource
} from '../selectors/metadata'
import isDarkMode from '../helpers/isDarkMode'
import useSiteMetadata from '../hooks/use-site-metadata'

const getLinks = (widgets = []) => [
  {
    href: '#posts',
    id: 'posts',
    text: 'Latest Posts'
  },
  ...(widgets.includes('instagram')
    ? [
        {
          href: '#instagram',
          id: 'instagram',
          text: 'Instagram'
        }
      ]
    : []),
  ...(widgets.includes('github')
    ? [
        {
          href: '#github',
          id: 'github',
          text: 'GitHub'
        }
      ]
    : []),
  ...(widgets.includes('goodreads')
    ? [
        {
          href: '#goodreads',
          id: 'goodreads',
          text: 'Goodreads'
        }
      ]
    : []),
  ...(widgets.includes('spotify')
    ? [
        {
          href: '#spotify',
          id: 'spotify',
          text: 'Spotify'
        }
      ]
    : [])
]

const HomeNavigation = () => {
  const { colorMode } = useThemeUI()
  const metadata = useSiteMetadata()
  const navItemsRef = useRef()

  const cardStyle = isDarkMode(colorMode) ? 'infoCardDark' : 'infoCard'

  const github = getGithubWidgetDataSource(metadata) && 'github'
  const goodreads = getGoodreadsWidgetDataSource(metadata) && 'goodreads'
  const instagram = getInstagramWidgetDataSource(metadata) && 'instagram'
  const spotify = getSpotifyWidgetDataSource(metadata) && 'spotify'

  const allHomeWidgets = [github, goodreads, instagram, spotify].filter(Boolean)

  const links = getLinks(allHomeWidgets)

  useEffect(() => {
    const navItemsEl = navItemsRef.current

    const handleSmoothScroll = event => {
      const el = event.target || event.srcElement
      if (el instanceof HTMLAnchorElement) {
        event.preventDefault()

        const href = el.getAttribute('href')
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        })
      }
    }

    navItemsEl.addEventListener('click', handleSmoothScroll)

    return () => {
      navItemsEl.removeEventListener('click', handleSmoothScroll)
    }
  }, [])

  return (
    <Fragment>
      <Heading
        aria-hidden='true'
        sx={{ display: ['none', 'revert'], mt: 0, mb: 4, visibility: 'hidden' }}
      >
        Widget Navigation
      </Heading>
      <Card
        sx={{
          boxShadow: 'default',
          position: `sticky`,
          top: `1.5em`
        }}
        variant={cardStyle}
      >
        <nav aria-label='Navigate to on-page sections' ref={navItemsRef}>
          On-page navigation
          {/* <ul ref={navItemsRef} sx={{ listStyle: `none`, padding: 0 }}> */}
          {links.map(({ href, id, text }) => (
            <Link href={href} key={id} variant='homeNavigation'>
              {text}
            </Link>
          ))}
          {/* </ul> */}
        </nav>
      </Card>
    </Fragment>
  )
}

export default HomeNavigation