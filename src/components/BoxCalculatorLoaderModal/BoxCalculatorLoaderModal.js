import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Modal } from 'semantic-ui-react';
import { addItemQuantity } from '../../actions';

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
        switch (this.props.currentUser.size) {
          case 'studio' || 'Studio':
            this.addBoxesHandler(5, 10, 3, 0, 2, 0);
            break;

          case '1 bedroom' || '1 bedroom apartment' || 'one bedroom apartment':
            this.addBoxesHandler(9, 15, 6, 0, 5, 0);
            break;

          case '2 bedroom' || '2 bedroom apartment' || 'two bedroom apartment':
            this.addBoxesHandler(15, 25, 10, 2, 7, 1);
            break;

          case '3 bedroom' ||
            '3 bedroom apartment' ||
            'three bedroom apartment':
            this.addBoxesHandler(20, 40, 12, 4, 7, 2);
            break;

          case '4 bedroom' || '4 bedroom apartment' || 'four bedroom apartment':
            this.addBoxesHandler(25, 45, 14, 6, 7, 3);
            break;

          default:
            break;
        }
        this.setState({ open: false });
        this.props.closeCallback(3);
      }, 1000); // TODO: bring back up to 7000 duration
    }
  }

  addBoxesHandler = (small, medium, large, wardrobe, picture, dishpack) => {
    this.addBoxesByCount(small, this.findItemIdByParentName('Small Box'));
    this.addBoxesByCount(medium, this.findItemIdByParentName('Medium Box'));
    this.addBoxesByCount(large, this.findItemIdByParentName('Large Box'));
    this.addBoxesByCount(wardrobe, this.findItemIdByParentName('Wardrobe Box'));
    this.addBoxesByCount(picture, this.findItemIdByParentName('Picture Box'));
    this.addBoxesByCount(
      dishpack,
      this.findItemIdByParentName('Dish-Pack Box')
    );
  };

  addBoxesByCount = (boxCount, itemId) => {
    for (let i = 0; i < boxCount; i++) {
      this.props.addItemQuantity(itemId);
    }
  };

  findItemIdByParentName = (itemParentName) => {
    return this.props.items.find((item) => item.parent_name === itemParentName)
      .item_ids;
  };

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
    currentUser: state.auth.currentUser,
    items: state.items,
  };
};

export default connect(mapStateToProps, { addItemQuantity })(
  BoxCalculatorLoaderModal
);
