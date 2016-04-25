import $ from 'zepto'

export default function (router) {
  router.map({
    '*': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/login': {
      component (resolve) {
        require(['./views/user/login'], resolve)
      }
    },
    '/happyPurchase': {
      component (resolve) {
        require(['./views/hp/happyPurchase'], resolve)
      }
    },
    '/happyPurchase/detail/:id': {
      name: 'itemDetail',
      component (resolve) {
        require(['./views/hp/itemDetail'], resolve)
      }
    },
    '/happyPurchase/help': {
      component (resolve) {
        require(['./views/hp/help'], resolve)
      }
    },
    '/latestAnnounced': {
      component (resolve) {
        require(['./views/hp/latestAnnounced'], resolve)
      }
    },
    '/plan': {
      component (resolve) {
        require(['./views/plan/plan'], resolve)
      }
    },
    '/plan/planDetail': {
      component (resolve) {
        require(['./views/plan/planDetail'], resolve)
      }
    },
    '/shopCart': {
      component (resolve) {
        require(['./views/cart/shopCart'], resolve)
      }
    },
    '/home': {
      component (resolve) {
        require(['./views/home'], resolve)
      }
    },
    '/user': {
      component (resolve) {
        require(['./views/user/user'], resolve)
      }
    },
    '/user/setting': {
      component (resolve) {
        require(['./views/user/setting'], resolve)
      }
    },
    '/user/changePwd': {
      component (resolve) {
        require(['./views/user/changePwd'], resolve)
      }
    },
    '/list': {
      component (resolve) {
        require(['./views/demo/list'], resolve)
      }
    },
    '/rank': {
      component (resolve) {
        require(['./views/demo/rank'], resolve)
      }
    },
    '/invite': {
      component (resolve) {
        require(['./views/demo/invite'], resolve)
      }
    },
    '/tasks': {
      component (resolve) {
        require(['./views/demo/tasks'], resolve)
      }
    },
    '/demo/tasks': {
      component (resolve) {
        require(['./views/demo/tasks'], resolve)
      }
    },
    '/demo/withdraw': {
      component (resolve) {
        require(['./views/demo/withdraw'], resolve)
      }
    },
    '/demo/profile': {
      component (resolve) {
        require(['./views/demo/profile'], resolve)
      }
    },
    '/demo/profit': {
      component (resolve) {
        require(['./views/demo/profit'], resolve)
      }
    },
    '/demo/profit/record': {
      component (resolve) {
        require(['./views/demo/profitRecord'], resolve)
      }
    },
    '/more': {
      component (resolve) {
        require(['./views/more/more'], resolve)
      }
    },
    '/more/feedback': {
      component (resolve) {
        require(['./views/more/feedback'], resolve)
      }
    },
    '/more/about': {
      component (resolve) {
        require(['./views/more/about'], resolve)
      }
    }
  })

  router.beforeEach(({abort, to, from, next, redirect}) => {
    let toPath = to.path
    // let fromPath = from.path
    // console.log('to: ' + toPath + ' from: ' + fromPath)
    if (toPath.replace(/[^/]/g, '').length > 1 || toPath.substring(0, 6) === '/login') {
      router.app.isIndex = false
    }
    else {
      let depath = toPath === '/' || toPath === '/latestAnnounced'
      router.app.isIndex = depath ? 0 : 1
    }
    next()
  })

  router.afterEach(function (transition) {
    // console.log('成功浏览到: ' + transition.to.path)
    if (!window.localStorage.getItem('cardBadge')) {
      window.localStorage.setItem('cardBadge', 0)
    }
    $.refreshScroller()
  })
}
