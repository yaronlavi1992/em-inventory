import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import { signIn, fetchItems } from '../actions';

const styles = {
  welcomeText: {
    fontFamily: 'CircularStd-Black',
    fontSize: '18px',
    color: '#ffffff',
    letterSpacing: '0',
    textAlign: 'center',
    lineHeight: '24px',
    fontWeight: '900',
  },
};

export class Intro extends Component {
  componentDidMount = async () => {
    await this.props.signIn(this.props.match.params.id);
    await this.props.fetchItems();
  };

  render() {
    return (
      <>
        <div className='flex_fill'>
          <h1 style={styles.welcomeText}>
            Welcome,{' '}
            {this.props.isSignedIn && this.props.currentUser.first_name}!
          </h1>
          <p className='white-text'>YOUR MOVE</p>
          <Header style={{ color: 'white' }}>
            {this.props.isSignedIn && this.props.currentUser.size}
            <br />
            From: {this.props.isSignedIn && this.props.currentUser.fromZip} |
            To: {this.props.isSignedIn && this.props.currentUser.toZip}
          </Header>
          <p className='white-text'>
            Browse our databse of common household items to build your Inventory
            and get an accurate quote
          </p>
          <Button
            id='get-started-btn'
            as={Link}
            to={`/p=${this.props.match.params.id}/items`}
            // className='ui colorBrightGreen button'
          >
            Get Started
          </Button>
        </div>
        <div
          className='white-text'
          style={{
            height: '100px',
            backgroundColor: '#CCCFD5',
            fontWeight: 'bolder',
            margin: '-15px',
            padding: '0px',
          }}
        >
          <div
            style={{
              backgroundColor: '#3a4b60',
              borderRadius: '0px 0px 15px 15px',
              height: '20px',
              margin: '0px',
              padding: '0px',
            }}
          ></div>
          <span id='fine-print'>* Your inventory affects your quote</span>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUser: state.auth.currentUser,
    items: state.items,
  };
};

export default connect(mapStateToProps, { signIn, fetchItems })(Intro);
