import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

function ItemOptionsModal(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}
    >
      <Modal.Header>{props.header}</Modal.Header>
      <Modal.Actions style={{ display: 'grid' }}>
        {props.actions.map((button) => {
          return (
            <Button key={button.key} onClick={() => setOpen(false)}>
              {button.content}
            </Button>
          );
        })}
      </Modal.Actions>
    </Modal>
  );
}

export default ItemOptionsModal;
