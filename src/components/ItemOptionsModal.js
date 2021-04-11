import React from 'react';
import { Button, Dropdown, Modal } from 'semantic-ui-react';

const ItemOptionsModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    props.optionsFromInnerItems[0].value
  );

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Dropdown
          style={{ color: '#57C3F3' }}
          options={props.optionsFromInnerItems}
          value={value}
        />
      }
    >
      <Modal.Header>{props.header}</Modal.Header>
      <Modal.Actions style={{ display: 'grid' }}>
        {props.actions.map((button) => {
          return (
            <Button
              key={button.key}
              onClick={() => {
                setOpen(false);
                setValue(button.id);
              }}
            >
              {button.content}
            </Button>
          );
        })}
      </Modal.Actions>
    </Modal>
  );
};

export default ItemOptionsModal;
