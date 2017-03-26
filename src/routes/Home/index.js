import HomeView from './components/HomeView'

// Sync route definition
export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      // const Elapse = require('./containers/ElapseContainer').default
      // const reducer = require('./modules/elapse').default
      // injectReducer(store, { key: 'elapse', reducer })
      cb(null, HomeView)
    })
  }
})
