const startCase = require('lodash/startCase')

exports.createPages = async ({ actions, graphql, reporter }) => {
  actions.createPage({
    component: require.resolve('./src/templates/home.js'),
    path: '/'
  })

  const result = await graphql(
    `
      {
        allMdx {
          edges {
            node {
              fields {
                id
                slug
                type
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panic('error loading content', result.errors)
    return
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.fields.slug ? node.fields.slug : '/',
      component:
        node.fields.type === 'media'
          ? require.resolve('./src/templates/media')
          : require.resolve('./src/templates/post'),
      context: {
        id: node.fields.id
      }
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions, reporter }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const title = node.frontmatter.title || startCase(parent.name)

    let slug = node.frontmatter.slug
    if (!slug && parent.relativePath) {
      slug = parent.relativePath.replace(parent.ext, '')
    }

    if (!slug) {
      reporter.panic(
        `Can not create node with title: ${title} there is no relative path or frontmatter to set the "slug" field`
      )
      return
    }

    if (slug === 'index') {
      slug = ''
    }

    const category = node.frontmatter.category
    if (category) {
      createNodeField({
        name: `category`,
        node,
        value: category
      })
    }

    const type = node.frontmatter.type
    if (type) {
      createNodeField({
        name: `type`,
        node,
        value: type
      })
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug
    })

    createNodeField({
      name: 'id',
      node,
      value: node.id
    })

    createNodeField({
      name: 'title',
      node,
      value: title
    })
  }
}
