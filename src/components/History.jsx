import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Info from './Info';
import '../css/History.css';

class History extends Component {
  // Displays previously completed items.
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      infoItem: false,
    };

    this.drillOpenInfo = this.drillOpenInfo.bind(this);
  }

  componentWillMount() {
    this.setState({ data: this.props.data });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data });
  }

  drillOpenInfo(infoItem) {
    console.log(infoItem);
    this.setState({ infoItem });
  }

  // TODO: Implement InfoBox here.
  render() {
    const { data, infoItem } = this.state;

    // If we're in an infoView, render Info.
    if (infoItem) {
      return (
        <section className="Main page">
          <Info
            item={infoItem}
            drillOpenInfo={this.drillOpenInfo}
            drillSaveItem={this.props.drillSaveItem}
            existing
          />
        </section>
      );
    }

    return (
      <section className="History page">
        <header className="primary">Past Challenges:</header>
        <List
          data={data}
          drillOpenInfo={this.drillOpenInfo}
          drillDoneItem={this.props.drillDoneItem}
          drillDeleteItem={this.props.drillDeleteItem}
        />
      </section>
    );
  }
}

History.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    date: PropTypes.string,
    notes: PropTypes.string,
    done: PropTypes.bool,
  })),
  drillDoneItem: PropTypes.func,
  drillSaveItem: PropTypes.func,
  drillDeleteItem: PropTypes.func,
};

History.defaultProps = {
  data: null,
  drillDoneItem: (() => { throw new ReferenceError('drillDoneItem not passed to Item'); }),
  drillSaveItem: (() => { throw new ReferenceError('drillSaveItem not passed to Item'); }),
  drillDeleteItem: (() => { throw new ReferenceError('drillDeleteItem not passed to Item'); }),
};

export default History;
