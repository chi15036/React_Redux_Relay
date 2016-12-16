import { connect } from 'react-redux'
import Subpage from '../components/Subpages/Subpages.js'
import {openModal} from '../redux/actions/createModal.js'

const mapStateToProps = (state, ownProps) => {
    return {
        activityInfo: state.activityInfo
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        openModal: () => {
            dispatch(openModal("create"))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Subpage)
