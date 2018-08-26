import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/DatePicker.css';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: '2',
      weeks: '0',
    };

    this.dayInp = React.createRef();
    this.weekInp = React.createRef();

    this.onDayKeyDown = this.onDayKeyDown.bind(this);
    this.onWeekKeyDown = this.onWeekKeyDown.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.onWeekClick = this.onWeekClick.bind(this);
    this.onWeekChange = this.onWeekChange.bind(this);
  }

  onDayClick() {
    this.dayInp.current.select();
  }

  onWeekClick() {
    this.weekInp.current.select();
  }

  onDayChange(e) {
    // If the value entered is a number in the valid range, change it.
    if (e.target.value === '') this.setState({ days: '' });
    const val = e.target.value;
    if (Number.isInteger(+val) && val >= 0 && val <= 9) {
      this.setState({ days: val });
    }
  }

  onWeekChange(e) {
    if (e.target.value === '') this.setState({ weeks: '' });
    const val = e.target.value;
    if (Number.isInteger(+val) && val >= 0 && val <= 7) {
      this.setState({ weeks: val });
    }
  }

  onDayKeyDown(e) {
    if (e.key === 'ArrowDown') {
      this.setState((({ days }) => {
        if (days > 0) return { days: (+days) - 1 };
        return null;
      }));
    } else if (e.key === 'ArrowUp') {
      this.setState((({ days }) => {
        if (days < 7) return { days: (+days) + 1 };
        return null;
      }));
    }
  }

  onWeekKeyDown(e) {
    if (e.key === 'ArrowDown') {
      this.setState((({ weeks }) => {
        if (weeks > 0) return { weeks: (+weeks) - 1 };
        return null;
      }));
    } else if (e.key === 'ArrowUp') {
      this.setState((({ weeks }) => {
        if (weeks < 9) return { weeks: (+weeks) + 1 };
        return null;
      }));
    }
  }

  submit() {
    // TODO: On submit validate that there is at least one day, then do whatever.
  }

  render() {
    const { days, weeks } = this.state;
    return (
      <section className="DatePicker">
        <input
          className="dateInp"
          id="day"
          onClick={this.onDayClick}
          onChange={this.onDayChange}
          onKeyDown={this.onDayKeyDown}
          ref={this.dayInp}
          value={days}
        />
        <span>
          Day(s)
        </span>
        <input
          className="dateInp"
          id="week"
          onClick={this.onWeekClick}
          onChange={this.onWeekChange}
          onKeyDown={this.onWeekKeyDown}
          ref={this.weekInp}
          value={weeks}
        />
        Week(s)
      </section>
    );
  }
}

DatePicker.propTypes = {
  initialDate: PropTypes.string,
};

DatePicker.propTypes = {
  initialDate: "1/1/1970",
};


export default DatePicker;
