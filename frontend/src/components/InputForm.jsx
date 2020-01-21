import React, {useState} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { string, func } from 'prop-types';

const InputForm = ({
  type, description,
  value, handleValueChange,
  handleValueSubmit}) => {

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleValueSubmit(evt)
    setOpenModal(false)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <Modal
      trigger={<Button primary icon="add" className={`${type}`}
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
            <Form.Button
              content="Submit"
              onClick={evt => handleSubmit(evt)}
              primary disabled={value.length < 2}/>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

InputForm.propTypes = {
  type: string,
  description: string,
  value: string,
  handleValueChange: func,
  handleValueSubmit: func
}
export default InputForm;