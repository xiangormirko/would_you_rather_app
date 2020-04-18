export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_VOTE = 'USER_VOTE'
export const USER_NEW_QUESTION = 'USER_NEW_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function userVote ({user, qid, vote}) {
  return {
    type: USER_VOTE,
    user,
    qid,
    vote,
  }
}

export function userNewQuestion (authedUser, qid) {
  return {
    type: USER_NEW_QUESTION,
    authedUser,
    qid,
  }
}
