import React, { Fragment } from 'react';
import { CategoryTable, FixedHeader } from './components'
import './App.css';

const App = ()  => {
  return (
    <Fragment>
      <header className="App-header">
        <FixedHeader />
        <CategoryTable />
      </header>
    </Fragment>
  );
}

export default App;
