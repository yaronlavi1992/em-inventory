import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalExampleModal from '../components/ModalExampleModal';

export class BoxCalculator extends Component {
  render() {
    const modalImage = `${process.env.PUBLIC_URL}/assets/unified-box-calculator.png`;
    const modalHeader = `Would you like help calculating
        how many boxes you need?`;
    const modalContent = `By selecting your items in the following step,
          we will be able to give an accurate estimate.
          However, your final cost will be based on the
          actual items being transported on the day of
          the move.`;
    return (
      <ModalExampleModal
        image={modalImage}
        imageSize='small'
        header={modalHeader}
        content={modalContent}
        nextPage={`/${this.props.userToken}/box-calculator-loader`}
        buttonText='Calculate'
        skipButton
        skipPage={`/${this.props.userToken}/items`}
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
