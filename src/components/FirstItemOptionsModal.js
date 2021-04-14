import React from 'react';
import { Grid, Label, Modal } from 'semantic-ui-react';
import ItemQuantityMenu from './ItemQuantityMenu';

const FirstItemOptionsModal = (props) => {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(
    props.optionsFromInnerItems[0].value
  );

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{props.header}</Modal.Header>
      <Modal.Actions style={{ display: 'grid' }}>
        {props.innerItems.map((innerItem) => {
          return (
            <Grid centered padded='vertically' key={innerItem.id}>
              <Grid.Column width={8}>
                <Label
                  onClick={() => {
                    setValue(innerItem.id);
                  }}
                >
                  {innerItem.content}
                </Label>
              </Grid.Column>
              <Grid.Column width={8}>
                <ItemQuantityMenu
                  itemQuantity={innerItem.quantity}
                  itemId={innerItem.id}
                />
              </Grid.Column>
            </Grid>
          );
        })}
      </Modal.Actions>
    </Modal>
  );
};

export default FirstItemOptionsModal;
