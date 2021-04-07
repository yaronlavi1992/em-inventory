import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import { signIn, signOut, fetchItems } from '../actions';

export class Intro extends Component {
  componentDidMount = async () => {
    await this.props.signIn(this.props.match.params.id);
    await this.props.fetchItems();
  };

  render() {
    return (
      <>
        <Header style={{ color: 'white' }}>
          Welcome, {this.props.isSignedIn && this.props.currentUser.first_name}!
        </Header>
        <p className='white-text'>YOUR MOVE</p>
        <Header style={{ color: 'white' }}>
          {this.props.isSignedIn && this.props.currentUser.size}
          <br />
          From: {this.props.isSignedIn && this.props.currentUser.fromZip} | To:{' '}
          {this.props.isSignedIn && this.props.currentUser.toZip}
        </Header>
        <p className='white-text'>
          Browse our databse of common household items to build your Inventory
          and get an accurate quote
        </p>
        <Link to={`/${this.props.match.params.id}/items`}>
          {/* <Link to={`/${this.props.match.params.id}/prompt`}> */}
          <Button className='ui colorBrightGreen button'>Get Started</Button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, { signIn, signOut, fetchItems })(Intro);
