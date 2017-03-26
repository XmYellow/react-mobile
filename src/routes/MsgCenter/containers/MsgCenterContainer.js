import { connect } from 'react-redux'
import { fetchZen } from '../modules/msgcenter'

import MsgCenter from '../components/MsgCenter'

const mapDispatchToProps = {
 fetchZen
}

const mapStateToProps = (state) => ({
  msgCenter: state.msgCenter
})


export default connect(mapStateToProps, mapDispatchToProps)(MsgCenter)
