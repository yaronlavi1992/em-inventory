import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Image, Modal } from 'semantic-ui-react';

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
    }
  }

  renderContent() {
    return (
      <>
        <Modal.Description>
          <Image
            size='small'
            src={`${process.env.PUBLIC_URL}/assets/confused.svg`}
            wrapped
            className='ui centered grid'
          />
          <Header>{`Calculating necessary box count`}</Header>
          <p>{`replace me with animation!
    add relevant boxes according to algorithm`}</p>
        </Modal.Description>
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

export default connect(mapStateToProps, {})(BoxCalculatorLoaderModal);
