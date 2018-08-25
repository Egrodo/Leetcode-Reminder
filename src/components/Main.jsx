import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isToday } from 'date-fns';
import List from './List';
import Item from './Item';
import '../css/Main.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      today: false,
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
    const { data } = this.props;
    // Check if there's one today.
    for (let i = 0; i < data.length; ++i) {
      if (isToday(data[i].date) && !data[i].done) {
        this.setState({ today: data[i] });
        break;
      }
    }
  }

  render() {
    const { data, today } = this.state;
    return (
      <section className="Main page">
        {today
          ? (
            <Fragment>
              <header className="secondary">Current Task:</header>
              <div className="highlightBox">
                <Item item={today} />
              </div>
            </Fragment>
          )
          : (
            <div className="noChallenge">
              <header className="primary">No challenge today</header>
              <button type="button" className="addOne" onClick={this.props.newBtn}>
                Add one?
              </button>
            </div>
          )
        }
        {data.length
          ? (
            <section className="currentReminders">
              <header className="secondary">Current Reminders:</header>
              <List data={data} />
            </section>
          )
          : (
            <header className="secondary">No Future Reminders</header>
          )
        }
      </section>
    );
  }
}

Main.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  newBtn: PropTypes.func,
};

Main.defaultProps = {
  data: null,
  newBtn: (() => { throw new ReferenceError('newBtn func not passed to Main.'); }),
};

export default Main;
