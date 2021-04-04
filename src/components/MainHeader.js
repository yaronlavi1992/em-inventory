import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';

class MainHeader extends Component {
  render() {
    return (
      <Grid padded='vertically' verticalAlign='middle' centered>
        <Grid.Row columns={2}>
          <Grid.Column floated='left'>
            {/* <Link to={`/${this.props.userToken ? this.props.userToken : null}`}> */}
            <Image
              src={`${process.env.PUBLIC_URL}/assets/bvl_logo_with_slogan.svg`}
              alt='BudgetVanLines.com'
            />
            {/* </Link> */}
          </Grid.Column>

          <Grid.Column floated='right' textAlign='right'>
            <a className='white-text' href='tel:(800) 611-6001'>
              (800) 611-6001
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     userToken: state.auth.token,
//   };
// };

export default connect(null, {})(MainHeader);
// export default connect(mapStateToProps, {})(MainHeader);
