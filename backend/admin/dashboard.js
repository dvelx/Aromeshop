class TabList {
  tablist = []
  constructor () {
    this.container = document.createElement('ul')
    this.container.classList.add(['nav', 'nav-tabs'])
    this.container.role = 'tablist'
  }

  get html () {
    return this.container
  }
}

export default class Dashboard {
  constructor () {
    this.container = document.createElement('div')
    this.container.classList.add('container')
  }

  get html () {
    return this.container
  }
}
