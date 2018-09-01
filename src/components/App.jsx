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

    this.recalcData = this.recalcData.bind(this);
    this.drillPageType = this.drillPageType.bind(this);
    this.drillDoneItem = this.drillDoneItem.bind(this);
    this.drillSaveItem = this.drillSaveItem.bind(this);
  }

  // TODO: Static method to update current and history.
  componentWillMount() {
    // DEV: Data is organized into a current and a history array.
    // If a user edits an item in history and makes it current, it needs to move.

    // On first mount, get the data and organize it.
    // On subsequent updates, re-organize it
    // On subsequent saves, update allData and re-organize it.

    // Organize data into history and current.
    this.recalcData(Data);
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
          this.recalcData(allData);
          return;
        }
      }
      throw new ReferenceError("Couldn't find the item to save in drillSaveItem");
    }
  }

  drillDoneItem(item) {
    // Search for item, mark it done (or not done).
    const allData = this.state.allData.map(o => ({ ...o }));
    for (let i = 0; i < allData.length; ++i) {
      if (allData[i].link === item.link) {
        allData[i].done = true;
        this.recalcData(allData);
      }
    }
  }

  drillPageType(page) {
    // This is not properly changing navbar display.
    this.setState({ page });
  }

  recalcData(allData) {
    this.setState((() => {
      const current = [];
      const history = [];
      allData.forEach((item) => {
        if (isToday(item.date) && !item.done) {
          current.push(item);
        } else if (isPast(item.date) || item.done) {
          history.push(item);
        } else current.push(item);
      });
      return { allData, current, history };
    }));
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
              <Main
                data={current}
                newBtn={(() => this.drillPageType('new'))}
                drillSaveItem={this.drillSaveItem}
                drillDoneItem={this.drillDoneItem}
              />
            );
            case 'history': return (
              <History
                data={history}
                drillDoneItem={this.drillDoneItem}
                drillSaveItem={this.drillSaveItem}
              />
            );
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
