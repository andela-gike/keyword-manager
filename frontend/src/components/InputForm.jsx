import React, {useState} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

const InputForm = ({
  type, description,
  value, handleValueChange,
  handleValueSubmit, handleClose}) => {

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = ( ) => {
    setOpenModal(true)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleValueSubmit(evt)
    setOpenModal(false)
  }


  return (
    <Modal
      trigger={<Button primary icon="add"
      {...(type === 'category' && { content: `Add ${type}` } )}
      onClick={handleOpen}/>}
      open={openModal}
      onClose={handleClose}
    >
      <Modal.Header>Add a new {type}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form onSubmit={handleValueSubmit}>
            <Form.Input
            placeholder={description}
            value={value}
            label={description}
            onChange={handleValueChange}/>
            <Form.Button content="Submit" onClick={evt => handleSubmit(evt)}/>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default InputForm;