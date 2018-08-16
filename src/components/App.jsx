import React, { Component } from 'react';
import { isToday } from 'date-fns';
import Navbar from './Navbar';
import List from './List';
import Highlight from './Highlight';
import Data from '../mock'; // DEV
import '../css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      today: false,
    };
  }

  componentDidMount() {
    this.setState({ data: Data });

    // Check if there's one today.
    for (let i = 0; i < Data.length; ++i) {
      if (isToday(Data[i].date)) {
        this.setState({ today: Data[i] });
        break;
      }
    }
  }

  render() {
    const { data, today } = this.state;
    return (
      <div className="App">
        <Navbar />
        {today ? <Highlight item={today} /> : ''}
        <List data={data} />
        <p className="footer">
          made by egrodo
        </p>
      </div>
    );
  }
}

export default App;