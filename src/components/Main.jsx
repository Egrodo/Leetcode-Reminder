import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isToday } from 'date-fns';
import List from './List';
import Item from './Item';
import Info from './Info';
import '../css/Main.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      today: false,
      infoItem: false,
    };

    this.drillOpenInfoItem = this.drillOpenInfoItem.bind(this);
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
    const { data } = this.props;
    // Check if there's one today.
    for (let i = 0; i < data.length; ++i) {
      if (isToday(data[i].date) && !data[i].done) {
        // DEV:
        this.setState({ today: data[i] });
        break;
      }
    }
  }

  drillOpenInfoItem(infoItem) {
    this.setState({ infoItem });
  }

  render() {
    const { data, today, infoItem } = this.state;

    // If we're in an infoView, render Info.
    if (infoItem) {
      return (
        <section className="Main page">
          <Info item={infoItem} drillOpenInfoItem={this.drillOpenInfoItem} />
        </section>
      );
    }

    // If there's a challenge to do today, show it in a Highlight.
    // If there are future challenges, display them.
    return (
      <section className="Main page">
        {today
          ? (
            <Fragment>
              <header className="primary">Current Challenge:</header>
              <div className="highlightBox">
                <Item item={today} drillOpenInfoItem={this.drillOpenInfoItem} />
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
              <header className="secondary">Future Challenges:</header>
              <List data={data} drillOpenInfoItem={this.drillOpenInfoItem} />
            </section>
          )
          : (
            <header className="secondary">No Future Challenges</header>
          )
        }
      </section>
    );
  }
}

Main.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    date: PropTypes.string,
    notes: PropTypes.string,
    done: PropTypes.bool,
  })),
  newBtn: PropTypes.func,
};

Main.defaultProps = {
  data: null,
  newBtn: (() => { throw new ReferenceError('newBtn func not passed to Main.'); }),
};

export default Main;
