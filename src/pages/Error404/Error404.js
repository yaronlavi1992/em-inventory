import React, { Component } from 'react';

export class Error404 extends Component {
  render() {
    return (
      <div
        className='ui grid middle aligned segment red inverted'
        style={{ height: '100%', margin: '0px' }}
      >
        <div className='ui column center aligned'>
          <div className='ui inverted statistic'>
            <div className='value'>404</div>
            <div className='label'>Error</div>
          </div>

          <div className='ui message red inverted'>
            <div className='header'>Description</div>
            <p>Not found</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Error404;
