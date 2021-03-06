const { configure, mount, render, shallow } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

configure({
  adapter: new Adapter()
})

global.___loader = {
  enqueue: jest.fn()
}

global.mount = mount
global.render = render
global.shallow = shallow

console.error = message => {
  throw new Error(message)
}
