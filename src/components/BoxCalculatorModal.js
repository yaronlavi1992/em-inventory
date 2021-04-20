import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

class BoxCalculatorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //only change state when dialog is opening
    if (!prevState.open && !this.state.open && this.props.isTriggered === 1) {
      this.setState({ open: true });
    }
  }

  renderContent() {
    return (
      <>
        <Modal.Description>
          <Image
            size='small'
            src={`${process.env.PUBLIC_URL}/assets/unified-box-calculator.png`}
            wrapped
            className='ui centered grid'
          />
          <Header>{`Would you like help calculating
        how many boxes you need?`}</Header>
          <p>{`By selecting your items in the following step,
          we will be able to give an accurate estimate.
          However, your final cost will be based on the
          actual items being transported on the day of
          the move.`}</p>
        </Modal.Description>
        <Button
          content='Calculate'
          onClick={() => {
            this.setState({ open: false });
            this.props.closeCallback();
          }}
          positive
        />
        <Button onClick={() => this.setState({ open: false })}>
          No thanks, I'll add boxes manually
        </Button>
      </>
    );
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        onClose={() => {
          this.setState({ open: false });
          this.props.closeCallback();
        }}
      >
        <Modal.Content image className='ui centered grid'>
          {this.renderContent()}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
  };
};

export default connect(mapStateToProps, {})(BoxCalculatorModal);
