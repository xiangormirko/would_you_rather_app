import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import NavigationHeader from './NavigationHeader'


class Dashboard extends Component {

  state = {
    unansweredView: true,
  }

  setAnswered = (e) => {
    e.preventDefault()

    this.setState({
      unansweredView: false,
    });
  }

  setUnanswered = (e) => {
    e.preventDefault()

    this.setState({
      unansweredView: true,
    });
  }

  displayUnanswered = () => {
    return (
      this.props.unansweredQuestions.map((id) => (
        <li key={id}>
            <Question id={id} />
        </li>
      ))
    )
  }

  displayAnswered = () => {
    return (
      this.props.answeredQuestions.map((id) => (
        <li key={id}>
            <Question id={id} />
        </li>
      ))
    )
  }


  render() {
    return (
      <div>
        <div className='list-container'>
          <ul className='dashboard-list'>
            <div className='dashboard-list__selector'>
              <button
                className= {`btn-selector ${this.state.unansweredView == true ? "btn--selected" : ""}`}
                onClick={this.setUnanswered}
                >Unanswered Questions
              </button>
              <button
                className={`btn-selector ${this.state.unansweredView == false ? "btn--selected" : ""}`}
                onClick={this.setAnswered}
                >Answered Questions
              </button>
            </div>
            {
              this.state.unansweredView === true
                ? this.displayUnanswered()
                : this.displayAnswered()
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser }) {

  const unansweredQuestions = Object.keys( questions )
    .filter(key => !questions[key].optionOne.votes.includes(authedUser)
      && !questions[key].optionTwo.votes.includes(authedUser))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)

  const answeredQuestions = Object.keys( questions )
    .filter(key => questions[key].optionOne.votes.includes(authedUser)
      || questions[key].optionTwo.votes.includes(authedUser))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)


  return {
    questionIds: Object.keys( questions )
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions: answeredQuestions,
    unansweredQuestions: unansweredQuestions,
  }
}

export default connect(mapStateToProps)(Dashboard)
