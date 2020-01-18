import React, { Fragment } from 'react';
import { Table, Label } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import CategoryModal from '../categories';
import KeywordModal from '../keywords';
import { GET_CATEGORIES } from '../../queries';
import DeleteAction from '../DeleteAction'

const DisplayTable = () => {
  return (
    <Fragment>
      <Query query={GET_CATEGORIES}>
      {({ loading, error, data }) => {
        console.log(data)
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
                    name={cat.name} openAction="hover"
                    itemId={cat.id}/>
                  <Table.Cell>{cat.keywords.map((eachKey, index) =>
                  (<Label key={index}>
                    {eachKey.name}
                    <DeleteAction type="keyword" name={eachKey.name} openAction="click"
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
                </Table.HeaderCell>
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