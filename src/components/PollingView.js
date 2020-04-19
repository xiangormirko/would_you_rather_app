import React, { Component, Fragment, Text } from 'react'
import { connect } from 'react-redux'
import { handleVoteQuestion } from '../actions/questions'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { userVote } from '../actions/users'


class PollingView extends Component {


  submitVote = (e) => {
    e.preventDefault()

    const {dispatch, question, authedUser} = this.props
    const { selectedOption } = this.state

    dispatch(handleVoteQuestion({
      authedUser,
      qid: question.id,
      answer: selectedOption,
    }))

    dispatch(userVote({
      user: authedUser,
      qid: question.id,
      vote: selectedOption,
    }))

    this.setState({
      voted: true,
      vote: selectedOption,
    })

  }

  handleOptionChange = (e) => {
    this.setState({
      selectedOption: e.target.value,
    })
  }


  state = {
    selectedOption: null,
    voted: false,
    vote: null,
  }

  voteLabel = () => {
    return (
      <Fragment>
      <div className='vote-label'>
        <div className='vote-label__text'>Your <br />Vote</div>
      </div>
      </Fragment>
    )
 }


render () {

  const {question, authedUser} = this.props

  if (this.state.voted === true || this.props.voted === true) {

    const optionOneVotes = this.props.question.optionOne.votes.length;
    const optionTwoVotes =this.props.question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOneProgress = Math.floor((optionOneVotes/totalVotes)*100)
    const optionTwoProgress = Math.floor((optionTwoVotes/totalVotes)*100)

    const optionOneProgressBar = <ProgressBar now={optionOneProgress} variant="success" label={`${optionOneProgress}%`} />;
    const optionTwoProgressBar = <ProgressBar now={optionTwoProgress} variant="success" label={`${optionTwoProgress}%`} />;

    return (
      <div className='polling-results'>
        <div className='polling-results__option'>
          {(this.state.vote === 'optionOne' || question.optionOne.votes.includes(authedUser)) && (this.voteLabel())}
          <h4 className='polling-results-title'>{this.props.question.optionOne.text}</h4>
          <div className='polling-results__progress-bar'>{optionOneProgressBar}</div>
          <p className='polling-results__stats'>{`${optionOneVotes} out of ${totalVotes} votes`}</p>
        </div>
        <div className='polling-results__option'>
          {(this.state.vote === 'optionTwo' || question.optionTwo.votes.includes(authedUser)) && (this.voteLabel())}
          <h4 className='polling-results-title'>{this.props.question.optionTwo.text}</h4>
          <div className='polling-results__progress-bar'>{optionTwoProgressBar}</div>
          <p className='polling-results__stats'>{`${optionTwoVotes} out of ${totalVotes} votes`}</p>
        </div>
      </div>
    )
  }

  return (

      <form className='radio-options'>
        <div className="radio">
        <label>
          <input type="radio" className="question-card__content__choices--1"
            value="optionOne" checked={this.state.selectedOption === 'optionOne'}
            onChange={this.handleOptionChange}
          />
          {this.props.question.optionOne.text}
        </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" className="question-card__content__choices--2"
              value="optionTwo" checked={this.state.selectedOption === 'optionTwo'}
              onChange={this.handleOptionChange}
            />
            {this.props.question.optionTwo.text}
          </label>
        </div>
        <button className='button-main-green' disabled={this.state.selectedOption === null} onClick={(e) => this.submitVote(e)}>Submit Choice</button>
      </form>
    )
}
}

function mapStateToProps ({authedUser, questions}, {id}) {
  const question = questions[id]

  return {
    authedUser,
    question: question,
    option_one_votes: !questions[id]
      ? []
      : questions[id].optionOne.votes,
    option_two_votes: !questions[id]
      ? []
      : questions[id].optionTwo.votes,
  }
}

export default connect(mapStateToProps)(PollingView)
