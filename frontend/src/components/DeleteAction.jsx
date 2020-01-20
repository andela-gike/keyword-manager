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
    evt.preventDefault();
    if (type === "keyword"){
      removeItem({variables: {keywordId: itemId}})
    } else {
      removeItem({variables: {categoryId: itemId}})
    }
  }


  render() {
    const { isOpen } = this.state
    const {name, itemId, type} = this.props;
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
              type === 'category' ?
              <TableCell selectable>
                <div className="selected">
                  {name}
                  <Icon name="delete" className="remove-cat" />
                </div>
              </TableCell>: <Icon name="delete"/>}
            flowing on="click" onOpen={this.handleOpen}>
            <Grid centered divided columns='equal'>
              <Grid.Column textAlign='center'>
                <Button className="popup-button" onClick={this.handleClose}>Cancel</Button>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Button
                  className="popup-button"
                  onClick={evt =>
                  this.handleDeleteItem(evt, type, removeItem, itemId)}
                  >Delete</Button>
              </Grid.Column>
            </Grid>
        </Popup>
        ))}
      </Mutation>
  )}
}
export default PopupDelete;