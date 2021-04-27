import React, { Component } from 'react';
import { Button, Modal, Image } from 'semantic-ui-react';
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
        <Modal.Header id='modal-header'>
          <span id='modal-edit-txt'>EDIT</span>
          {this.props.item && (
            <Image
              style={{ width: '40px', height: '40px', paddingTop: '2.5%' }}
              src={`${process.env.PUBLIC_URL}/assets/${this.props.item.icon}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${process.env.PUBLIC_URL}/assets/default.svg`;
              }}
            />
          )}
          <span id='modal-item-name'>
            {this.props.item && this.props.item.parent_name}
          </span>
          <span id='modal-select-size-txt'>Select Size:</span>
        </Modal.Header>
        {this.props.item && this.renderContent()}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => {
              this.setState({ open: false });
              this.props.closeCallback(null);
            }}
            id='modal-cancel-btn'
          >
            Cancel
          </Button>
        </div>
      </Modal>
    );
  }
}

export default FirstItemOptionsModal;
