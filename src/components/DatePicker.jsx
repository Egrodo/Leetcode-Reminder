import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumPicker from './NumPicker';
import '../css/DatePicker.css';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 2,
      dayPicker: true,
      weeks: 0,
      weekPicker: false,
    };

    this.onDayClick = this.onDayClick.bind(this);
    this.onWeekClick = this.onWeekClick.bind(this);
  }

  onDayClick() {
    // Open the selector.
    this.setState(((prev) => {
      return { dayPicker: !prev.dayPicker };
    }));
  }

  onWeekClick() {
    this.setState(((prev) => {
      return { weekPicker: !prev.weekPicker };
    }));
  }

  drillNumChange(e) {
    console.log(e.target.innerText);
  }

  render() {
    const { days, weeks } = this.state;
    return (
      <section className="DatePicker">
        <button className="dateBtn" onClick={this.onDayClick} type="button">
          {days}
        </button>
        <NumPicker type="day" drillNumChange={this.drillNumChange} />
        <span>
          {`Day${days > 1 ? 's' : ''}`}
        </span>
        <button className="dateBtn" onClick={this.onWeekClick} type="button">
          {weeks}
        </button>
        {`Week${days > 1 ? 's' : ''}`}
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
