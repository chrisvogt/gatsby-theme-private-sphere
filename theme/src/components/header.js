/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

import SwoopBottom from './artwork/swoop-bottom'
import trianglify from './artwork/trianglify.svg'

/**
 * Header
 *
 * A decorative masthead element that can be used across page layouts.
 */
const Header = ({ children, hideTopPadding, showSwoop, styles }) => (
  <div
    sx={{
      variant: `styles.Header`,
      background: `url(${trianglify})`,
      backgroundSize: `cover`,
      backgroundPosition: `bottom center`
    }}
  >
    <div
      sx={{
        pt: hideTopPadding ? 0 : 5,
        ...(styles ? styles : {})
      }}
    >
      {children}
    </div>
    {showSwoop && <SwoopBottom invert />}
  </div>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
  showSwoop: PropTypes.bool
}

Header.defaultProps = {
  showSwoop: false
}

export default Header
