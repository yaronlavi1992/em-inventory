import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import './ClearAllItemsModal.css';

class ClearAllItemsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //only change state when dialog is opening
    if (!prevState.open && !this.state.open && this.props.isTriggered) {
      this.setState({ open: true });
    }
  }

  renderContent() {
    return (
      <>
        <Modal.Description>
          <p id='are-you-sure-txt'>
            Are you sure you want to delete all inventory items?
          </p>
        </Modal.Description>
        <Button
          id='clear-all-items-button'
          onClick={() => {
            this.setState({ open: false });
            this.props.closeCallback(true);
          }}
          positive
        >
          Yes, delete all items
        </Button>
        <Button
          id='clear-all-items-button'
          onClick={() => {
            this.setState({ open: false });
            this.props.closeCallback(false);
          }}
          negative
        >
          Cancel
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
          this.props.closeCallback(false);
        }}
      >
        <Modal.Content style={{ textAlign: 'center' }}>
          {this.renderContent()}
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(null, {})(ClearAllItemsModal);
