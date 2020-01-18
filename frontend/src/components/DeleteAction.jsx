import React, { Component } from 'react'
import { Button, Popup, Grid, TableCell, Icon } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { DELETE_CATEGORY, DELETE_KEYWORD, GET_CATEGORIES } from '../queries'

class PopupDelete extends Component {
  state = { isOpen: false }
  handleClose = () => {
    this.setState({ isOpen: false })
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleDeleteItem = (evt, type, removeItem, itemId) => {
    console.log(itemId)
    evt.preventDefault();
    if (type === "keyword"){
      removeItem({variables: {keywordId: itemId}})
    } else {
      removeItem({variables: {categoryId: itemId}})
    }
  }


  render() {
    const { isOpen } = this.state
    const {openAction, name, itemId, type} = this.props;
    return(
      <Mutation
        {...(type === 'keyword' && { mutation: DELETE_KEYWORD } )}
        {...(type === 'category' && { mutation: DELETE_CATEGORY } )}
        refetchQueries={[{ query: GET_CATEGORIES }]}>
        {(removeItem => (
          <Popup
            open={isOpen}
            size='small'
            trigger={
              openAction === 'hover' ?
              <TableCell selectable>{name}</TableCell>: <Icon name="delete"/>}
            flowing on={openAction} onOpen={this.handleOpen}>
            <Grid centered divided columns='equal'>
              <Grid.Column textAlign='center'>
                <Button onClick={this.handleClose}>Cancel</Button>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Button onClick={evt => this.handleDeleteItem(evt, type, removeItem, itemId)}>Delete</Button>
              </Grid.Column>
            </Grid>
        </Popup>
        ))}
      </Mutation>
  )}
}
export default PopupDelete;