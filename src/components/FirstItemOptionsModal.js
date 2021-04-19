import React, { Component } from 'react';
import { Grid, Label, Modal } from 'semantic-ui-react';
import ItemQuantityMenu from './ItemQuantityMenu';

//R: better develop everything in unified notation: either classes or functions
//const FirstItemOptionsModal = (props) => {
class FirstItemOptionsModal extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      open: false,
      value: null
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    //only change state when dialog is opening
    if(this.props.item !== null && !prevState.open && !this.state.open){
      this.setState({open: this.props.item !== null});
      if(this.props.item){
        let optionsFromInnerItems = this.props.item.innerItems.map((innerItem, index) => {
          return {
            key: index,
            text: innerItem.item,
            value: innerItem.item_id,
            quantity: innerItem.quantity,
          };
        });
        
        if(optionsFromInnerItems.length > 0){
          this.setState({value: optionsFromInnerItems[0].value});
        }else{
          this.setState({value: optionsFromInnerItems[0].value});
        }
      }
    }
  }

  renderContent(){
    return (
      <Modal.Content style={{ display: 'grid' }}>
      {
        this.props.item.innerItems.map((innerItem) => {
            return (
              <Grid centered padded='vertically' key={innerItem.item_id}>
                <Grid.Column width={8}>
                  <Label
                    onClick={() => {
                      this.setState({value: innerItem.item_id});
                    }}
                  >
                    {innerItem.item}
                  </Label>
                </Grid.Column>
                {
                  //R: instead of ItemQuantityMenu component there should be buttons as in mockup
                  //R: clicking a button should invoke ADD_ITEM_QUANTITY action and close the dialog
                }
                <Grid.Column width={8}>
                  <ItemQuantityMenu
                    itemQuantity={innerItem.quantity}
                    itemId={innerItem.item_id}
                  />
                </Grid.Column>
              </Grid>
            );
          })
      }
      </Modal.Content>
    );
  }

  render(){
    return (
      <Modal
        closeIcon
        onClose={() => {
          this.setState({open: false});
          //R: after buttons are implemented, send selected ItemID and null if nothing is selected
          this.props.closeCallback(null);
        }
      }
        open={this.state.open}
      >
        <Modal.Header>{this.props.item ? this.props.item.parent_name : ''}</Modal.Header>
        {(()=>{
          if(this.props.item){
            return this.renderContent();
          }
          })()
        }
        </Modal>
      );
    }
};

export default FirstItemOptionsModal;
