import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
import { signIn, fetchItems } from '../../actions';
import './Intro.css';

export class Intro extends Component {
  componentDidMount = async () => {
    await this.props.signIn(this.props.match.params.id);
    await this.props.fetchItems();
  };

  render() {
    return (
      <>
        <div id='flex-fill'>
          <h1 id='welcome-text'>
            Welcome,{' '}
            {this.props.isSignedIn && this.props.currentUser.first_name}!
          </h1>
          <h1 id='your-move-text'>YOUR MOVE</h1>
          <hr
            style={{
              borderTop: '1px solid #CCCFD5',
              width: '8%',
              marginTop: '0px',
            }}
          />
          <h1 id='move-size'>
            {this.props.isSignedIn && this.props.currentUser.size}
            <br />
            From: {this.props.isSignedIn && this.props.currentUser.fromZip} |
            To: {this.props.isSignedIn && this.props.currentUser.toZip}
          </h1>
          <p id='browse-our-data'>
            Browse our databse of common household items to build your Inventory
            and get an accurate quote
          </p>
          <Button
            id='get-started-btn'
            as={Link}
            to={`/p=${this.props.match.params.id}/items`}
          >
            Get Started
          </Button>
          <Image
            src={`${process.env.PUBLIC_URL}/assets/illustration_lr.svg`}
            wrapped
            id='illustrated-lr-img'
          />
        </div>
        <div
          className='white-text'
          style={{
            height: '150px',
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
          <div id='fine-print'>* Your inventory affects your quote</div>
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
