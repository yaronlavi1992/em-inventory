import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const ModalExampleTopAligned = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Content className='ui centered grid'>
        <Modal.Description>
          Boxes can be hard to
          <br />
          estimate. Use our Box
          <br />
          Calculator tool to let us
          <br />
          help you find the right
          <br />
          amount.
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ModalExampleTopAligned;
