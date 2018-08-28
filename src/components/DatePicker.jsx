import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isFuture, isToday, differenceInDays, addDays, format } from 'date-fns';
import '../css/DatePicker.css';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: '0',
      weeks: '0',
      date: '',
    };

    this.dayInp = React.createRef();
    this.weekInp = React.createRef();

    this.onType = this.onType.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onWeekClick = this.onWeekClick.bind(this);
  }

  componentDidMount() {
    // Take the initialDate and calc the days/weeks.
    const { initialDate } = this.props;
    if (initialDate === '') return;
    if (isFuture(initialDate)) {
      // If it's in the future, calculate the days/weeks.
      const diffInDays = differenceInDays(initialDate, Date.now());
      const weeks = Math.floor(diffInDays / 7);
      // HACK: When you have more brain power figure out why this is needed.
      const days = (diffInDays % 7) + 1;
      this.setState({ days, weeks, date: initialDate });
    }
  }

  componentDidUpdate() {
    // When the component updates (ie: day/week count changes), ensure it was changed then recalc.
    const { days, weeks, date } = this.state;
    const newDate = format(addDays(Date.now(), (+days + (+weeks * 7))), 'M/DD/YYYY');
    if (newDate !== date) {
      this.props.drillDateChange(days, weeks);
      this.setState({ date: newDate });
    }
  }

  onDayClick() {
    this.dayInp.current.select();
  }

  onWeekClick() {
    this.weekInp.current.select();
  }

  onType(e) {
    // When a new day/week is manually typed.
    if (e.target.id === 'day') {
      if (e.target.value === '') this.setState({ days: '' });
      const val = e.target.value;
      if (Number.isInteger(+val) && val >= 0 && val < 100) this.setState({ days: val });
    } else if (e.target.id === 'week') {
      if (e.target.value === '') this.setState({ weeks: '' });
      const val = e.target.value;
      if (Number.isInteger(+val) && val >= 0 && val <= 9) this.setState({ weeks: val });
    }
  }

  onKeyDown(e) {
    // When the user inc/decrements with arrow keys.
    if (e.target.id === 'day') {
      if (e.key === 'ArrowDown') {
        this.setState((({ days }) => {
          if (days > 0) return { days: (+days) - 1 };
          return null;
        }));
      } else if (e.key === 'ArrowUp') {
        this.setState((({ days }) => {
          if (days < 99) return { days: (+days) + 1 };
          return null;
        }));
      }
    } else if (e.target.id === 'week') {
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
  }

  render() {
    const { days, weeks, date } = this.state;
    const dateText = (isToday(date) || date === '') ? 'Today' : date;
    return (
      <section className="DatePicker">
        <input
          className="dateInp"
          id="day"
          onClick={this.onDayClick}
          onChange={this.onType}
          onKeyDown={this.onKeyDown}
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
          onChange={this.onType}
          onKeyDown={this.onKeyDown}
          ref={this.weekInp}
          value={weeks}
        />
        Week(s)
        <header className="secondary">{dateText}</header>
      </section>
    );
  }
}

DatePicker.propTypes = {
  initialDate: PropTypes.string,
  drillDateChange: PropTypes.func,
};

DatePicker.defaultProps = {
  initialDate: '1/1/1970',
  drillDateChange: (() => { throw new ReferenceError('drillDateChange not passed to DatePicker'); }),
};

export default DatePicker;
