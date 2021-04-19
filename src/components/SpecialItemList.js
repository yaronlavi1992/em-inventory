import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, List } from 'semantic-ui-react';

const styles = {
  listItem: {
    backgroundColor: '#E7E8EC',
  },
  addBtn: {
    borderRadius: '500px',
    backgroundColor: 'inherit',
    border: '1px solid',
  },
  checkedBtn: {
    borderRadius: '500px',
    color: 'white',
    backgroundColor: '#3A4B60',
    border: '1px solid',
  },
  listItemIcon: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  },
};

class SpecialItemList extends React.Component {
  renderSpecialItems() {
    return this.props.items.filter((item) => {
      return item.quantity > 0 && item.sh_price !== '0';
    });
  }

  renderList(items) {
    return items.map((item, index) => {
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
            <Grid.Row columns={3}>
              <Grid.Column>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {item.parent_name}
                </div>
              </Grid.Column>

              <Grid.Column textAlign='right'>${item.sh_price}</Grid.Column>

              <Grid.Column textAlign='right'>
                {item.quantity === 0 ? (
                  <Button
                    style={styles.addBtn}
                    //TODO: change addQuantityHandler to manage sh_price's quantity
                    onClick={() => this.addQuantityHandler(item)}
                  >
                    ADD
                  </Button>
                ) : (
                  <Button style={styles.checkedBtn}>✔</Button>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <List celled divided verticalAlign='middle'>
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
