import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';

class MainHeader extends Component {
  render() {
    return (
      <Grid padded='vertically' verticalAlign='middle' centered>
        <Grid.Row columns={2}>
          <Grid.Column floated='left'>
            <Image
              src={`${process.env.PUBLIC_URL}/assets/bvl_logo_with_slogan.svg`}
              alt='BudgetVanLines.com'
            />
          </Grid.Column>

          <Grid.Column floated='right' textAlign='right'>
            <a id='company-phone-number' href='tel:(800) 611-6001'>
              (800) 611-6001
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(null, {})(MainHeader);
