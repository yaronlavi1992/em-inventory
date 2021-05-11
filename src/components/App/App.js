import React, { Component } from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import Intro from '../../pages/Intro/Intro';
import MainHeader from '../MainHeader/MainHeader';
import SpecialCareItems from '../../pages/SpecialCareItems/SpecialCareItems';
import { Container } from 'semantic-ui-react';
import Confirmation from '../../pages/Confirmation/Confirmation';
import { connect } from 'react-redux';
import AllItems from '../../pages/AllItems/AllItems';
import history from '../../history';
import Error404 from '../../pages/Error404/Error404';
import './App.css';

class App extends Component {
  render() {
    return (
      <div
        id='stackable-grid'
        className='ui one column stackable center aligned page grid'
      >
        <div id='main-wrapper' className='column twelve wide'>
          <Container className='flex-container'>
            <Router basename={process.env.PUBLIC_URL} history={history}>
              <MainHeader />
              <Switch>
                <Route path='/p=:id' exact component={Intro} />
                <Route path='/p=:id/items' exact component={AllItems} />
                <Route
                  path='/p=:id/items/special'
                  exact
                  component={SpecialCareItems}
                />
                <Route
                  path='/p=:id/confirmation'
                  exact
                  component={Confirmation}
                />
                <Route path='/error404' exact component={Error404} />
                <Redirect to='/' />
              </Switch>
            </Router>
          </Container>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
  };
};
export default connect(mapStateToProps, {})(App);
