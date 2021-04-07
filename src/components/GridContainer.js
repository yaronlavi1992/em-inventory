import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, ButtonGroup, Grid } from 'semantic-ui-react';
import { addItemQuantity, reduceItemQuantity } from '../actions';

class GridContainer extends Component {
  addQuantityHandler(itemId) {
    this.props.addItemQuantity(itemId);
  }

  reduceQuantityHandler(itemId) {
    this.props.reduceItemQuantity(itemId);
  }

  renderList() {
    return this.props.items.map((item) => {
      return (
        <Grid.Row key={item.parent_name}>
          {/* <Grid.Row key={item.id}> */}
          <Grid
            container
            doubling
            divided='vertically'
            verticalAlign='middle'
            centered
            style={{ padding: '0px', margin: '0px' }}
          >
            <Grid.Row columns={this.props.isSpecialItems ? 4 : 2}>
              <Grid.Column>
                <Icon name={item.icon} />
                {item.name}
              </Grid.Column>

              {this.props.isSpecialItems && (
                <>
                  <Grid.Column></Grid.Column>
                  <Grid.Column textAlign='right'>
                    {/* ${item.packageFee} */}
                  </Grid.Column>
                </>
              )}

              <Grid.Column textAlign='right'>
                {item.quantity === 0 ? (
                  <Button
                    onClick={() => this.addQuantityHandler(item.parent_name)}
                  >
                    {/* <Button onClick={() => this.addQuantityHandler(item.id)}> */}
                    ADD
                  </Button>
                ) : (
                  <ButtonGroup>
                    <Button
                      icon
                      onClick={() =>
                        this.reduceQuantityHandler(item.parent_name)
                      }
                      // onClick={() => this.reduceQuantityHandler(item.id)}
                    >
                      <Icon name='minus' />
                    </Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button
                      icon
                      onClick={() => this.addQuantityHandler(item.parent_name)}
                      // onClick={() => this.addQuantityHandler(item.id)}
                    >
                      <Icon name='plus' />
                    </Button>
                  </ButtonGroup>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Row>
      );
    });
  }

  render() {
    return (
      <Grid
        container
        doubling
        divided='vertically'
        verticalAlign='middle'
        centered
      >
        {this.renderList()}
      </Grid>
    );
  }
}

export default connect(null, { addItemQuantity, reduceItemQuantity })(
  GridContainer
);
