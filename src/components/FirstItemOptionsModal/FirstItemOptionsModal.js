import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import './FirstItemOptionsModal.css';

class FirstItemOptionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: null,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //only change state when dialog is opening
    if (this.props.item !== null && !prevState.open && !this.state.open) {
      this.setState({ open: this.props.item !== null });
      if (this.props.item) {
        let optionsFromInnerItems = this.props.item.innerItems.map(
          (innerItem, index) => {
            return {
              key: index,
              text: innerItem.item,
              value: innerItem.item_id,
              quantity: innerItem.quantity,
            };
          }
        );
        this.setState({ value: optionsFromInnerItems[0].value });
      }
    }
  }

  renderContent() {
    return (
      <Modal.Content style={{ display: 'grid' }}>
        <Button.Group vertical>
          {this.props.item.innerItems.map((innerItem, index) => {
            return (
              <Button
                id={`${
                  this.props.selectedValue === innerItem.item
                    ? 'selected-btn'
                    : 'normal-btn'
                }`}
                key={innerItem.item_id}
                onClick={() => {
                  this.setState({ value: innerItem.item_id, open: false });
                  this.props.closeCallback(innerItem.item_id);
                }}
              >
                {innerItem.item}
              </Button>
            );
          })}
        </Button.Group>
      </Modal.Content>
    );
  }

  render() {
    return (
      <Modal
        closeIcon
        onClose={() => {
          this.setState({ open: false });
          this.props.closeCallback(null);
        }}
        open={this.state.open}
      >
        <Modal.Header>
          {this.props.item && this.props.item.parent_name}
        </Modal.Header>
        {this.props.item && this.renderContent()}
      </Modal>
    );
  }
}

export default FirstItemOptionsModal;
