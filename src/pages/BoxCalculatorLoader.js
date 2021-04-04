import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalExampleModal from '../components/ModalExampleModal';

export class BoxCalculator extends Component {
  render() {
    const modalImage = `${process.env.PUBLIC_URL}/assets/confused.svg`;
    const modalHeader = `Calculating necessary box count`;
    const modalContent = `replace me with animation!
    add relevant boxes according to algorithm`;
    return (
      <ModalExampleModal
        image={modalImage}
        header={modalHeader}
        content={modalContent}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
  };
};

export default connect(mapStateToProps, {})(BoxCalculator);
