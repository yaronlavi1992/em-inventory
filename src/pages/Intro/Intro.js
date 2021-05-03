import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
import { signIn, fetchItems } from '../../actions';
import './Intro.css';

export class Intro extends Component {
  constructor() {
    super();
    this.state = {
      isLoadingItems: true,
    };
  }

  componentDidMount = async () => {
    await this.props.signIn(this.props.match.params.id);
    if (this.props.currentUser.sbm) {
      window.location = `https://bvl-sabf.web.app/welcome/${this.props.userToken}`;
    }
    await this.props.fetchItems();
    this.setState({
      isLoadingItems: false,
    });
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
          <hr id='separator' />
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
            disabled={this.state.isLoadingItems}
          >
            Get Started
          </Button>
          <Image
            src={`${process.env.PUBLIC_URL}/assets/illustration_lr.svg`}
            wrapped
            id='illustrated-lr-img'
          />
        </div>
        <div id='fine-print-div'>
          <div id='blue-bottom-rounded-corners'></div>
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
