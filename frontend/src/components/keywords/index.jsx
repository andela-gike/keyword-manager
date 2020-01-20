import React, {Component, Fragment} from 'react';
import { Mutation } from 'react-apollo';
import InputModal from '../InputForm';
import { POST_KEYWORD, GET_CATEGORIES } from '../../queries'

class Keyword extends Component {
  state = {
    newKeyword: ''
  }

  handleAddNewKeyword = (e, { value }) => {
    this.setState({ newKeyword : value})
  }

  handleSubmitNewKeyWord = (evt, postKeyword, categoryId) => {
    const {newKeyword} = this.state;
    evt.preventDefault();
    postKeyword({variables: {keywordName: newKeyword, categoryId}})
    this.setState({ newKeyword : ''})
  }

  render() {
    const {newKeyword} = this.state;
    const { categoryId } = this.props;
    return (
      <Fragment>
        <Mutation mutation={POST_KEYWORD}
         refetchQueries={[{ query: GET_CATEGORIES }]}>
          {(postKeyword => (
            <InputModal
            type="keyword"
            description="Keyword Name"
            value={newKeyword}
            handleValueChange={this.handleAddNewKeyword}
            handleValueSubmit={evt =>
              this.handleSubmitNewKeyWord(evt, postKeyword, categoryId)}
            />
          ))}
        </Mutation>
      </Fragment>
    )
  }
};

export default Keyword;