import React, { Fragment } from 'react';
import { Table, Label, Button } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import CategoryModal from '../categories';
import KeywordModal from '../keywords';
import { GET_CATEGORIES } from '../../queries';
import DeleteAction from '../DeleteAction'

const DisplayTable = () => {
  return (
    <Fragment>
      <Query
       query={GET_CATEGORIES}
       variables={{
        offset: 0,
        limit: 5
      }} fetchPolicy="cache-and-network">
      {({ loading, error, data, fetchMore }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return (
          <Table celled className="table-container">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Categories</Table.HeaderCell>
                <Table.HeaderCell>Keywords</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.categories.map((cat, index) => (
                <Table.Row key={index}>
                    <DeleteAction type="category"
                    name={cat.name}
                    itemId={cat.id}/>
                  <Table.Cell>{cat.keywords.map((eachKey, index) =>
                  (<Label key={index}>
                    {eachKey.name}
                    <DeleteAction type="keyword" name={eachKey.name}
                    itemId={eachKey.id}/>
                  </Label>)
                  )}
                    <KeywordModal categoryId={cat.id}/>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>
                  <CategoryModal />
                  <Button onClick={() =>
                      fetchMore({
                        variables: {
                          offset: data.categories.length,
                        },
                        updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            categories: [...prev.categories, ...fetchMoreResult.categories]
                          });
                        },
                      })} primary floated="right">
                    Load More
                  </Button>
                </Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        );
        }}
      </Query>
    </Fragment>
  )
}

export default DisplayTable;