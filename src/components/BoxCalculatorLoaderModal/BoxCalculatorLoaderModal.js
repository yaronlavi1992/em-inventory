import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Modal } from 'semantic-ui-react';

class BoxCalculatorLoaderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //only change state when dialog is opening
    if (!prevState.open && !this.state.open && this.props.isTriggered === 2) {
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false });
        this.props.closeCallback(3);
      }, 7000);
    }
  }

  renderContent() {
    return (
      <>
        <Modal.Description>
          <Image
            size='large'
            src={`${process.env.PUBLIC_URL}/assets/boxloader-sm.gif`}
            wrapped
            className='ui centered grid'
          />
        </Modal.Description>
      </>
    );
  }

  render() {
    return (
      <Modal open={this.state.open}>
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

export default connect(mapStateToProps, {})(BoxCalculatorLoaderModal);
