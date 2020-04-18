import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'


class QuestionPage extends Component {

  display404 = () => {
    return (
      <div>
      <h1>404</h1>
      <h2>The question you are looking for is missing, please reload</h2>
      </div>
    )
  }


  render() {
    const {id, question, authedUser} = this.props

    if (typeof id === 'undefined' || typeof question === 'undefined') {
      return (
        this.display404()
      )
    }

    return (
      <div className='list-container'>
        <Question id={this.props.id} polling={true}
          voted={
            question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
            ? true
            : false
          }
        />
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]

  return {
    id,
    question,
    authedUser,
  }
}


export default connect(mapStateToProps)(QuestionPage)
