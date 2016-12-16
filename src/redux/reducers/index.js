import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import activityInfo from './activityInfo.js'
import pet from './pet.js'
import commonModal from './commonModal.js'

export default combineReducers({
    activityInfo,
    pet,
    commonModal,
    routing: routerReducer
})