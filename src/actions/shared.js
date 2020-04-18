import { getInitialData} from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

//hardcoded, will need to change and handle impersonation
const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
   return (dispatch) => {
     dispatch(showLoading())
     return getInitialData()
      .then(({users, questions}) => {
         dispatch(receiveUsers(users))
         dispatch(receiveQuestions(questions))
         dispatch(setAuthedUser(AUTHED_ID)) //beware! Hardcode
         dispatch(hideLoading())
      })
   }
}
