import React, { Component } from 'react';
import Navbar from './Navbar';
import New from './New';
import History from './History';
import Data from '../mock'; // DEV
import '../css/App.css';
import Main from './Main';
import { isPast } from 'date-fns';

class App extends Component {
  constructor() {
    super();
    this.state = {
      current: [],
      history: [],
      page: 'main',
    };

    this.drillPageType = this.drillPageType.bind(this);
  }

  componentWillMount() {
    // Calculate which items go where at toplevel to save on recalcs.
    // History contains any items whose dates have past or have been marked 'done'.
    const current = [];
    const history = [];
    Data.forEach((item) => {
      if (isPast(item.date) || item.done) {
        history.push(item);
      } else current.push(item);
    });
    this.setState({ current, history });
  }

  drillPageType(page) {
    this.setState({ page });
  }

  render() {
    const { current, history, page } = this.state;

    // TODO: Replace switch with React Router implementation.
    // There's also a problem currently with the navBar not keeping track of which page we're on if not used to switch.
    return (
      <div className="App">
        <Navbar drillPageType={this.drillPageType} />
        {(() => {
          switch (page) {
            case 'main': return <Main data={current} newBtn={(() => this.drillPageType('new'))} />;
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
