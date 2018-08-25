import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isToday } from 'date-fns';
import List from './List';
import Highlight from './Highlight';

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
      if (isToday(data[i].date)) {
        this.setState({ today: data[i] });
        break;
      }
    }
  }

  render() {
    const { data, today } = this.state;
    return (
      <Fragment>
        <Highlight item={today} />
        <List data={data} />
      </Fragment>
    );
  }
}

Main.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
};

Main.defaultProps = {
  data: null,
};

export default Main;
