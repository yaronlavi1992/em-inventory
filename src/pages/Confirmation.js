import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Confirmation extends Component {
  componentDidMount() {
    window.location.href = `https://bvl-sabf.web.app/welcome/${this.props.userLeadId}`;
  }
  render() {
    const referenceId = '5-43-8742';
    const dummyUser = 'Troy';
    return (
      <div className='thanks-pop' style={{ display: 'table' }}>
        <div className='thanks-pop-outer'>
          <div className='thanks-pop-inner'>
            <div className='thanks-title'>Completed!</div>
            <div className='refText'>
              Reference #: <span id='referId'>{referenceId}</span>
            </div>
            <div className='thanksTxt'>Thank you, {dummyUser}.</div>
            <div className='refText'>
              Your inventory has been sent to your BudgetVanLines rep.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLeadId: state.auth.currentUser.lead_id,
  };
};

export default connect(mapStateToProps, {})(Confirmation);
