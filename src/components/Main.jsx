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

    this.drillOpenInfo = this.drillOpenInfo.bind(this);
    this.saveItemEdit = this.saveItemEdit.bind(this);
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

  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data });
    const { data } = newProps;
    for (let i = 0; i < data.length; ++i) {
      if (isToday(data[i].date) && !data[i].done) {
        this.setState({ today: data[i] });
        break;
      }
    }
  }

  drillOpenInfo(infoItem) {
    this.setState({ infoItem });
  }

  saveItemEdit(item) {
    this.props.drillSaveItem(item, this.state.infoItem);
  }

  render() {
    const { data, today, infoItem } = this.state;

    // If we're in an infoView, render Info.
    if (infoItem) {
      return (
        <section className="Main page">
          <Info
            item={infoItem}
            drillOpenInfo={this.drillOpenInfo}
            saveItem={this.saveItemEdit}
            existing
          />
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
                <Item item={today} drillOpenInfo={this.drillOpenInfo} />
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
              <List data={data} drillOpenInfo={this.drillOpenInfo} />
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
  drillSaveItem: PropTypes.func,
};

Main.defaultProps = {
  data: null,
  newBtn: (() => { throw new ReferenceError('newBtn func not passed to Main.'); }),
  drillSaveItem: (() => { throw new ReferenceError('drillSaveItem func not passed to Main.'); }),
};

export default Main;
