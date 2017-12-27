import {combineReducers} from 'redux'

import user from './userReducer'
import his from './hisReducer'
import searchQs from './searchQsReducer'
import searchDB from './searchDataBaseReducer'

export default combineReducers({
    user,
    his,
    searchQs,
    searchDB,
})