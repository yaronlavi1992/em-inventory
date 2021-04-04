import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalExampleModal from '../components/ModalExampleModal';

export class InitialPrompt extends Component {
  render() {
    const image = `${process.env.PUBLIC_URL}/assets/confused.svg`;
    const header = `Don't Sweat the Small Stuff`;
    const content = `By selecting your items in the following step,
      we will be able to give an accurate estimate.
      However, your final cost will be based on the
      actual items being transported on the day of
      the move.`;
    return (
      <ModalExampleModal
        image={image}
        header={header}
        content={content}
        nextPage={`/${this.props.userToken}/items`}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
  };
};

export default connect(mapStateToProps, {})(InitialPrompt);
