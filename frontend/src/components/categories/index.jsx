import React, {Component, Fragment} from 'react';
import { Mutation } from 'react-apollo';
import { POST_CATEGORY, GET_CATEGORIES } from '../../queries';
import InputModal from '../InputForm';

class Category extends Component {
  state = {
    newCategory: ''
  }

  handleAddNewCategory = (e, { value }) => {
    this.setState({ newCategory : value})
  }

  handleSubmitNewCategory = (evt, postCategory) => {
    const {newCategory} = this.state;
    evt.preventDefault();
    postCategory({variables: {categoryName: newCategory}})
  }

  handleCloseModal = () => {

  }

  render() {
    const {newCategory} = this.state;
    return (
      <Fragment>
        <Mutation mutation={POST_CATEGORY}
          refetchQueries={[{ query: GET_CATEGORIES }]}
          >
          {(postCategory => (
            <InputModal
            type="category"
            description="Category Name"
            value={newCategory}
            handleValueChange={this.handleAddNewCategory}
            handleValueSubmit={evt => this.handleSubmitNewCategory(evt, postCategory)}
            handleClose={this.handleCloseModal}
            />
          ))}
        </Mutation>
      </Fragment>
    )
  }
};

export default Category;