import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { userNewQuestion } from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const VOTE_QUESTION = 'VOTE_QUESTION'


export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}
function submitQuestionVote () {

}

function voteQuestion ({authedUser, qid, answer}) {
  return {
    type: VOTE_QUESTION,
    authedUser,
    qid,
    answer
  }
}
export function handleVoteQuestion (info) {
  return (dispatch) => {
    dispatch(voteQuestion(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleVoteQuestion: ', e)
        // dispatch a way to let the user vote again
          alert('The was an error submitting your vote. Try again.')
      })
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}
export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const {authedUser} = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => {
              dispatch(addQuestion(question))
              dispatch(userNewQuestion(authedUser, question.id))})
      .then(() => dispatch(hideLoading()))
  }
}
