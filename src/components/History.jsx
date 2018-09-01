import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import '../css/History.css';

class History extends Component {
  // Displays previously completed items.
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.drillOpenInfo = this.drillOpenInfo.bind(this);
  }

  componentWillMount() {
    this.setState({ data: this.props.data });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data });
  }

  drillOpenInfo() {

  }

  // TODO: Implement InfoBox here.
  // TODO: Make 'done' and 'delete' work here.
  render() {
    const { data } = this.state;
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
  drillDeleteItem: PropTypes.func,
};

History.defaultProps = {
  data: null,
  drillDoneItem: (() => { throw new ReferenceError('drillDoneItem not passed to Item'); }),
  drillDeleteItem: (() => { throw new ReferenceError('drillDeleteItem not passed to Item'); }),
};

export default History;
