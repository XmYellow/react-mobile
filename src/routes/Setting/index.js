import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'setting',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Setting = require('./components/Setting').default
      // const reducer = require('./modules/elapse').default
      // injectReducer(store, { key: 'elapse', reducer })
      cb(null, Setting)
    })
  }
})
