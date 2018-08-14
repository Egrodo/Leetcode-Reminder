import React, { Component } from 'react';
import List from './List';
import Data from './mock'; // DEV
import './css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ data: Data });
  }

  render() {
    // TODO: Sort them by day.
    const { data } = this.state;
    return (
      <div className="App">
        <header>Leetcode Reminders</header>
        <List data={data} />
      </div>
    );
  }
}

export default App;
