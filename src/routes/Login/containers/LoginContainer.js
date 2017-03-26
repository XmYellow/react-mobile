import { connect } from 'react-redux'
import { fetchZen, clearZen } from '../modules/LoginModules'

import Zen from '../components/Login'

const mapDispatchtoProps = {
  fetchZen,
  clearZen
}

const mapStateToProps = (state) => ({
  zen: state.zen
})

export default connect(mapStateToProps, mapDispatchtoProps)(Zen)
