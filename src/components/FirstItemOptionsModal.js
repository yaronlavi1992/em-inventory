import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

const styles = {
  normalBtn: {
    border: '1px solid #57C3F3',
    borderRadius: '5px',
    lineHeight: '20px',
    letterSpacing: '0',
    margin: '6px 2px 6px 2px',
    fontWeight: '400',
    color: '#57C3F3',
    backgroundColor: 'white',
  },
  selectedBtn: {
    border: '1px solid #57C3F3',
    borderRadius: '5px',
    lineHeight: '20px',
    letterSpacing: '0',
    margin: '6px 2px 6px 2px',
    fontWeight: '400',
    color: 'white',
    backgroundColor: '#57C3F3',
  },
};

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

        if (optionsFromInnerItems.length > 0) {
          this.setState({ value: optionsFromInnerItems[0].value });
        } else {
          this.setState({ value: null });
        }
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
                style={
                  !this.props.selectedValue && index === 0
                    ? styles.selectedBtn
                    : this.props.selectedValue === innerItem.item
                    ? styles.selectedBtn
                    : styles.normalBtn
                }
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
