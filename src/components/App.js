import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import '../App.css';
import Dashboard from './Dashboard';
import QuestionPage from './QuestionPage';
import NavigationHeader from './NavigationHeader';
import NewQuestion from './NewQuestion';
import SignIn from './SignIn';
import Leaderboard from './Leaderboard'


class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <NavigationHeader />
            {this.props.loading === true
              ? <SignIn/>
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:id' component={QuestionPage} />
                  <Route path='/new' component={NewQuestion} />
                  <Route path='/signin' component={SignIn} />
                  <Route path='/leaderboard' component={Leaderboard} />
                </div>
                }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
