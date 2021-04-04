import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment, Tab } from 'semantic-ui-react';
import { fetchItems } from '../actions';
import ItemList from '../components/ItemList';
import ModalExampleModal from '../components/ModalExampleModal';
import SearchBar from '../components/SearchBar';

class AllItems extends Component {
  renderItemsTotalQuantity() {
    const result = this.props.items.reduce((sum, val) => sum + val.quantity, 0);
    return result || '';
  }

  render() {
    const modalImage = `${process.env.PUBLIC_URL}/assets/confused.svg`;
    const modalHeader = `Don't Sweat the Small Stuff`;
    const modalContent = `By selecting your items in the following step,
      we will be able to give an accurate estimate.
      However, your final cost will be based on the
      actual items being transported on the day of
      the move.`;
    return (
      <React.Fragment>
        <ModalExampleModal
          image={modalImage}
          header={modalHeader}
          content={modalContent}
          nextPage={`/${this.props.userToken}/items`}
          buttonText='OK, GOT IT!'
        />

        <Grid
          verticalAlign='middle'
          centered
          padded='vertically'
          style={{ backgroundColor: 'white' }}
        >
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header
                floated='left'
                size='tiny'
                textAlign='center'
                style={{ fontSize: '3.5vw' }}
              >
                Moving Inventory List
              </Header>
            </Grid.Column>

            <Grid.Column>
              <Link to={`/${this.props.userToken}/items/special`}>
                <Header
                  size='tiny'
                  floated='right'
                  textAlign='center'
                  style={{ color: '#20b118', fontSize: '3vw' }}
                >
                  CONFIRM INVENTORY
                </Header>
              </Link>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={{ padding: '0px' }}>
            <Tab
              style={{ width: 'inherit' }}
              panes={[
                {
                  menuItem: 'All Items',
                  render: () => (
                    <Tab.Pane style={{ padding: '0px' }}>
                      <SearchBar />
                      <Segment
                        style={{
                          overflow: 'auto',
                          maxHeight: 550,
                          margin: '0px',
                        }}
                      >
                        <ItemList isSpecialItems={false} />
                      </Segment>
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: `My Items ${this.renderItemsTotalQuantity()}`,
                  render: () => (
                    <Tab.Pane style={{ padding: '0px' }}>
                      <SearchBar isMyItems />
                      <Segment
                        style={{
                          overflow: 'auto',
                          maxHeight: 550,
                          margin: '0px',
                        }}
                      >
                        <ItemList isMyItems />
                      </Segment>
                    </Tab.Pane>
                  ),
                },
              ]}
            />
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.token,
    items: state.items,
  };
};

export default connect(mapStateToProps, { fetchItems })(AllItems);
