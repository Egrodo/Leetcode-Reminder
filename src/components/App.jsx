import React, { Component } from 'react';
import Navbar from './Navbar';
import New from './New';
import History from './History';
import Data from '../mock'; // DEV
import '../css/App.css';
import Main from './Main';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      page: 'main',
    };

    this.drillPageType = this.drillPageType.bind(this);
  }

  componentWillMount() {
    this.setState({ data: Data });
  }

  drillPageType(page) {
    this.setState({ page });
  }

  render() {
    const { data, page } = this.state;

    return (
      <div className="App">
        <Navbar drillPageType={this.drillPageType} />
        {(() => {
          switch (page) {
            case 'main': return <Main data={data} />;
            case 'history': return <History data={data} />;
            case 'new': return <New />;
            default: return null; // TODO: This
          }
        })()}
        <p className="footer">
          made by egrodo
        </p>
      </div>
    );
  }
}

export default App;
