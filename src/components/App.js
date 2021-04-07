import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import history from '../history';
import Intro from '../pages/Intro';
import MainHeader from './MainHeader';
import AllItems from '../pages/AllItems';
import SpecialCareItems from '../pages/SpecialCareItems';
import { Container } from 'semantic-ui-react';
import Confirmation from '../pages/Confirmation';
import { connect } from 'react-redux';
import BoxCalculator from '../pages/BoxCalculator';
import BoxCalculatorLoader from '../pages/BoxCalculatorLoader';

class App extends Component {
  render() {
    return (
      <Container style={{ margin: '0px' }}>
        <BrowserRouter basename={process.env.PUBLIC_URL} history={history}>
          <MainHeader />
          <Switch>
            <Route path='/:id' exact component={Intro} />
            <Route
              path={`/${
                this.props.userToken ? this.props.userToken : ''
              }/items`}
              exact
              component={AllItems}
            />
            <Route
              path={`/${
                this.props.userToken ? this.props.userToken : ''
              }/box-calculator`}
              exact
              component={BoxCalculator}
            />
            <Route
              path={`/${
                this.props.userToken ? this.props.userToken : ''
              }/box-calculator-loader`}
              exact
              component={BoxCalculatorLoader}
            />
            <Route
              path='/:id/items/special'
              exact
              component={SpecialCareItems}
            />
            <Route path='/:id/confirmation' exact component={Confirmation} />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
  };
};
export default connect(mapStateToProps, {})(App);
