import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { submitInventory } from '../actions';
import ItemList from '../components/ItemList';

class SpecialCareItems extends Component {
  render() {
    return (
      <div className='specialCare-pop' style={{ display: 'block' }}>
        <div className='specialCare-pop-inner'>
          <div className='specialCare-title'>Some Items Require Boxing</div>

          <p>
            In addition to the standard blankets provided, the following items
            require additional protection. Would you like your movers to box the
            following items for you, at an additional cost?
          </p>
          <ItemList isSpecialItems />
          <Link className='skip' to={`/${this.props.userToken}/confirmation`}>
            Skip this, I'll box these myself ?
          </Link>

          <div className='inv-btn-outer'>
            <Link
              to={`/${this.props.userToken}/confirmation`}
              onClick={this.props.submitInventory(
                this.props.items,
                this.props.userToken
              )}
            >
              <p
                id='special-care-items-done-btn'
                href='/confirmation'
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
