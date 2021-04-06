import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <Link
            className='skip'
            to={`/${this.props.match.params.id}/confirmation`}
          >
            Skip this, I'll box these myself ?
          </Link>

          <div className='inv-btn-outer'>
            <Link to={`/${this.props.match.params.id}/confirmation`}>
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
      // <>
      //   <div className='ui secondary menu'>
      //     <Link to='/items' className='item'>
      //       <Image
      //         size='mini'
      //         src='./assets/box.svg'
      //         wrapped
      //         className='ui centered grid'
      //       />
      //       <div className='white-text'>{`< Go Back`}</div>
      //     </Link>
      //     <div className='right menu'></div>
      //   </div>

      //   <h4 className='white-text'>Some Items Require Boxing</h4>
      //   <p className='white-text'>
      //     In addition to the standard blankets provided,
      //     <br />
      //     the following items require additional
      //     <br /> protection. Would you like your movers to
      //     <br />
      //     box the following items for you, at an additional cost?
      //   </p>
      //   <ItemList isSpecialItems />
      //   <Grid padded='horizontally' centered>
      //     <Link to='/confirmation'>Skip this, I'll box these myself ?</Link>
      //   </Grid>
      // </>
    );
  }
}

export default SpecialCareItems;
