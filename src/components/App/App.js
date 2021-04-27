import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Intro from '../../pages/Intro/Intro';
import MainHeader from '../MainHeader/MainHeader';
import SpecialCareItems from '../../pages/SpecialCareItems/SpecialCareItems';
import { Container } from 'semantic-ui-react';
import Confirmation from '../../pages/Confirmation/Confirmation';
import { connect } from 'react-redux';
import AllItems from '../../pages/AllItems/AllItems';
import './App.css';

class App extends Component {
  render() {
    return (
      <div
        id='stackable-grid'
        className='ui one column stackable center aligned page grid'
      >
        <div id='mainWrapper' className='column twelve wide'>
          <Container className='flex_container'>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <MainHeader />
              <Switch>
                <Route path='/p=:id' exact component={Intro} />
                <Route
                  path={`/p=${
                    this.props.userToken ? this.props.userToken : ''
                  }/items`}
                  exact
                  component={AllItems}
                />
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
                <Redirect to='/' />
              </Switch>
            </BrowserRouter>
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
