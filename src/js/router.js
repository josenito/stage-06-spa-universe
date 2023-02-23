export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    this.updateScreen(pathname)

    fetch(route)
      .then(data => data.text())
      .then(html => { document.querySelector('#app').innerHTML = html })
  }

  updateScreen(pathname) {
    document.querySelector('body').classList.remove('imgHome')
    document.querySelector('body').classList.remove('imgUniverse')
    document.querySelector('body').classList.remove('imgExploration')
    document.querySelector('body').classList.remove('imgError404')

    document.querySelector('.menuHome').classList.remove('selected')
    document.querySelector('.menuUniverse').classList.remove('selected')
    document.querySelector('.menuExploration').classList.remove('selected')

    switch (pathname) {
      case "/":
        document.querySelector('body').classList.add('imgHome')
        document.querySelector('.menuHome').classList.add('selected')
        break
      case "/universe":
        document.querySelector('body').classList.add('imgUniverse')
        document.querySelector('.menuUniverse').classList.add('selected')
        break
      case "/exploration":
        document.querySelector('body').classList.add('imgExploration')
        document.querySelector('.menuExploration').classList.add('selected')
        break
      default:
        document.querySelector('body').classList.add('imgError404')
    }
  }


}