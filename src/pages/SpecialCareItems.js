import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { submitInventory } from '../actions';
import SpecialItemList from '../components/SpecialItemList';

class SpecialCareItems extends Component {
  render() {
    return (
      <div className='specialCare-pop' style={{ display: 'block' }}>
        <Link to={`/p=${this.props.userToken}/items`}>
          <p style={{ color: 'white', float: 'left', marginLeft: '12.5px' }}>
            <Icon style={{ margin: '0px' }} name='angle left' />
            Go Back
          </p>
        </Link>
        <div className='specialCare-pop-inner'>
          <div className='specialCare-title'>Some Items Require Boxing</div>

          <p>
            In addition to the standard blankets provided, the following items
            require additional protection. Would you like your movers to box the
            following items for you, at an additional cost?
          </p>
          <SpecialItemList />
          <Link
            className='skip'
            to={`/p=${this.props.userToken}/confirmation`}
            onClick={() => {
              this.props.submitInventory(
                this.props.items,
                this.props.userToken
              );
            }}
          >
            Skip this, I'll box these myself ?
          </Link>

          <div className='inv-btn-outer'>
            <Link to={`/p=${this.props.userToken}/confirmation`}>
              <p
                onClick={() =>
                  this.props.submitInventory(
                    this.props.items,
                    this.props.userToken
                  )
                }
                id='special-care-items-done-btn'
                className='btn inv-btn doneInv'
              >
                Done
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    userToken: state.auth.token,
  };
};

export default connect(mapStateToProps, { submitInventory })(SpecialCareItems);
