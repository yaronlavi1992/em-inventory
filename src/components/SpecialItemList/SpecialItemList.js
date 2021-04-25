import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, List } from 'semantic-ui-react';
import './SpecialItemList.css';

class SpecialItemList extends React.Component {
  renderSpecialItems() {
    return this.props.items.filter((item) => {
      if (item.quantity > 0) {
        if (item.innerItems && Number(item.innerItems[0].sh_price) > 0) {
          return item;
        } else if (Number(item.sh_price) > 0) {
          return item;
        }
      }
      return false;
    });
  }

  renderList(items) {
    return items.map((item) => {
      return (
        <List.Item key={item.parent_name}>
          <Grid
            container
            doubling
            divided='vertically'
            verticalAlign='middle'
            centered
            style={{ padding: '0px' }}
          >
            <Grid.Column width={10} floated='left'>
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span className='listItemName'>{item.parent_name}</span>
              </div>
            </Grid.Column>

            <Grid.Column width={3} floated='right' textAlign='right'>
              $
              {item.innerItems
                ? item.innerItems.reduce(
                    (a, b) => a + Number(b.sh_price) * b.quantity,
                    0
                  )
                : Number(item.sh_price) * item.quantity}
            </Grid.Column>

            <Grid.Column width={3} floated='right' textAlign='right'>
              {item.quantity === 0 ? (
                <Button
                  id='add-btn'
                  //TODO: change addQuantityHandler to manage sh_price's quantity
                  onClick={() => this.addQuantityHandler(item)}
                >
                  ADD
                </Button>
              ) : (
                <Button id='checked-btn'>✔</Button>
              )}
            </Grid.Column>
          </Grid>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <List
        celled
        divided
        verticalAlign='middle'
        style={{ marginLeft: '-25px', marginRight: '-25px' }}
      >
        <List.Item key={'packing-fee'}>
          <Grid
            container
            doubling
            divided='vertically'
            verticalAlign='middle'
            centered
            style={{ padding: '0px' }}
          >
            <Grid.Column width={10} floated='left'></Grid.Column>

            <Grid.Column
              width={3}
              floated='right'
              textAlign='right'
              style={{ paddingLeft: '0px' }}
            >
              <span id='packing-fee'>PACKING FEE</span>
            </Grid.Column>

            <Grid.Column width={3} floated='right'></Grid.Column>
          </Grid>
        </List.Item>
        {this.renderList(this.renderSpecialItems())}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps, {})(SpecialItemList);
