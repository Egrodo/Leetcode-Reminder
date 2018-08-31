import React, { Component } from 'react';
import { isPast, isToday } from 'date-fns';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import New from './New';
import History from './History';
import Data from '../mock'; // NOTE: Dev
import '../css/App.css';
import Main from './Main';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allData: [],
      current: [],
      history: [],
      page: 'main',
    };

    this.drillPageType = this.drillPageType.bind(this);
    this.drillSaveItem = this.drillSaveItem.bind(this);
  }

  componentWillMount() {
    // DEV: Data is organized into a current and a history array.
    // If a user edits an item in history and makes it current, it needs to move.

    // On first mount, get the data and organize it.
    // On subsequent updates, re-organize it
    // On subsequent saves, update allData and re-organize it.

    // Organize data into history and current.
    const current = [];
    const history = [];
    Data.forEach((item) => {
      if (isToday(item.date) && !item.done) {
        current.push(item);
      } else if (isPast(item.date) || item.done) {
        history.push(item);
      } else current.push(item);
    });
    this.setState({ allData: Data, current, history });
  }

  componentDidUpdate() {

  }

  drillSaveItem(newItem, oldItem) {
    // First ensure that there is actually a change.
    if (newItem.link !== oldItem.link || newItem.date !== oldItem.date || newItem.notes !== oldItem.notes) {
      const allData = this.state.allData.map(o => ({ ...o }));
      // Search for the oldItem, get the index.
      for (let i = 0; i < allData.length; ++i) {
        if (allData[i].link === oldItem.link) {
          // If we found it, update allData and recalc current / history.
          allData[i] = newItem;
          this.setState((({ current, history }) => {
            const newCurr = current.map(o => ({ ...o }));
            const newHist = history.map(o => ({ ...o }));
            allData.forEach((item) => {
              if (isToday(item.date) && !item.done) {
                newCurr.push(item);
              } else if (isPast(item.date) || item.done) {
                newHist.push(item);
              } else newCurr.push(item);
            });
            console.log(newCurr);
            return { current: newCurr, history: newHist };
          }));
          return;
        }
      }
      // If we've finished the loop without finding it, error. TODO:
    }
  }

  drillPageType(page) {
    // This is not properly changing navbar display.
    this.setState({ page });
  }

  render() {
    const { current, history, page } = this.state;

    // TODO: Replace switch with React Router implementation.
    return (
      <div className="App">
        <Navbar drillPageType={this.drillPageType} active={page} />
        {(() => {
          switch (page) {
            case 'main': return (
              <Main data={current} newBtn={(() => this.drillPageType('new'))} drillSaveItem={this.drillSaveItem} />
            );
            case 'history': return <History data={history} />;
            case 'new': return <New />;
            default: return <Main data={current} />;
          }
        })()}
        <p className="footer">
          <a href="https://github.com/Egrodo">made by egrodo</a>
        </p>
      </div>
    );
  }
}

export default App;
