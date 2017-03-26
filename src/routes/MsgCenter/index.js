import { injectReducer } from '../../store/reducers'
// import { onEnter } from './../../components/utils/redirect'
export default (store) => ({
  path: 'msgCenter',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const MsgCenter = require('./containers/MsgCenterContainer').default
      const reducer = require('./modules/msgcenter').default
      injectReducer(store, { key: 'msgCenter', reducer })
      cb(null, MsgCenter)
    })
  },
    // onEnter
})
