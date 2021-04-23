import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import './ModalExampleModal.css';

const ModalExampleModal = (props) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button style={{ display: 'none' }} />}
    >
      <Modal.Content image className='ui centered grid'>
        <Modal.Description>
          <Image
            size={props.imageSize}
            src={props.image}
            wrapped
            className='ui centered grid'
          />
          <Header>{props.header}</Header>
          <p>{props.content}</p>
        </Modal.Description>
        {props.buttonText && (
          <Button
            id='ok-got-it-btn'
            as={Link}
            to={props.nextPage || '/'}
            content={props.buttonText}
            onClick={() => setOpen(false)}
          />
        )}
        {props.skipButton && (
          <Link to={props.skipPage}>No thanks, I'll add boxes manually</Link>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalExampleModal;
