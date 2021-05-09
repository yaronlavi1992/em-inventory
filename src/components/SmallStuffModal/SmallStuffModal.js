import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { triggerSmallStuffModal } from '../../actions';
import './SmallStuffModal.css';

class SmallStuffModal extends Component {
  render() {
    return (
      <Modal
        onClose={() => this.props.triggerSmallStuffModal()}
        open={!this.props.triggers.isSmallStuffModalTriggered}
        trigger={<Button style={{ display: 'none' }} />}
      >
        <Modal.Content image className='ui centered grid'>
          <Modal.Description>
            <Image
              size='medium'
              src={`${process.env.PUBLIC_URL}/assets/confused.svg`}
              wrapped
              className='ui centered grid'
            />
            <Header>Don't Sweat the Small Stuff</Header>
            <p>
              By selecting your items in the following step, we will be able to
              give an accurate estimate. However, your final cost will be based
              on the actual items being transported on the day of the move.
            </p>
          </Modal.Description>
          <Button
            id='ok-got-it-btn'
            as={Link}
            to={`/p=${this.props.userToken}/items`}
            content='OK, GOT IT!'
            onClick={() => this.props.triggerSmallStuffModal()}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    triggers: state.triggers,
  };
};

export default connect(mapStateToProps, { triggerSmallStuffModal })(
  SmallStuffModal
);
