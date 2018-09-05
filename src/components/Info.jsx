import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { addDays, format } from 'date-fns';
import getName from '../modules/getName';
import DatePicker from './DatePicker';
import '../css/Info.css';

class Info extends Component {
  // The infobox that pops up when clicking the 'i' icon on a reminder.
  constructor(props) {
    super(props);

    this.state = {
      link: '',
      date: '',
      notes: '',
      done: false,
    };

    this.linkInput = React.createRef();


    this.saveItem = this.saveItem.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.onLinkChange = this.onLinkChange.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onNotesChange = this.onNotesChange.bind(this);
    this.drillDateChange = this.drillDateChange.bind(this);
  }

  componentWillMount() {
    // TODO: If currently on a Leetcode page, autofill that page.

    // Implement better link solution.
    const name = getName(this.props.item.link);
    this.setState({ name, ...this.props.item });

    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e) {
    // Save item on ctrl enter.
    if (e.ctrlKey && e.key === 'Enter') {
      this.props.drillSaveItem(this.state, this.props.item);
      if (this.props.existing) this.props.drillOpenInfo(false);
    }
  }

  onLinkClick() {
    this.linkInput.current.select();
  }

  onLinkChange(e) {
    this.setState({ link: e.target.value });
  }

  onNotesChange(e) {
    this.setState({ notes: e.target.value });
  }

  onCancelClick() {
    this.props.drillOpenInfo(false);
  }

  drillDateChange(days, weeks) {
    // Take week and days and turn them into a date string from now.
    // BUG: Date changes all funky when in the negatives.
    const date = format(addDays(Date.now(), (+days + (+weeks * 7))), 'M/DD/YYYY');
    this.setState({ date });
  }

  saveItem() {
    // Save stuff the close the info screen.
    this.props.drillSaveItem(this.state, this.props.item);
    if (this.props.existing) this.props.drillOpenInfo(false);
  }

  render() {
    const { name, link, date, notes } = this.state;
    const { existing } = this.props;
    return (
      <section className="Info">
        <header className="primary">{name}</header>

        <div className="link">
          <header className="secondary">Link:</header>
          <input
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            type="text"
            value={link}
            onClick={this.onLinkClick}
            onChange={this.onLinkChange}
            ref={this.linkInput}
            placeholder="Paste link here..."
          />
        </div>

        <div className="dateSelect">
          <header className="secondary">When?</header>
          <DatePicker initialDate={date} drillDateChange={this.drillDateChange} />
        </div>

        <div className="notes">
          <header className="secondary">Notes:</header>
          <textarea
            className="notesText"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            type="text"
            value={notes}
            onChange={this.onNotesChange}
            placeholder="Any notes about the problem can go here!"
          />
        </div>
        {existing
          ? (
            <Fragment>
              <button className="infoBtn cancel" onClick={this.onCancelClick} type="submit">
                Cancel
              </button>
              <button className="infoBtn" onClick={this.saveItem} type="submit">
                Save
              </button>
            </Fragment>
          )
          : (
            <button className="infoBtn" onClick={this.saveItem} type="submit">
              Save
            </button>
          )
        }

      </section>
    );
  }
}

Info.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  existing: PropTypes.bool,
  drillOpenInfo: PropTypes.func,
  drillSaveItem: PropTypes.func,
};

Info.defaultProps = {
  item: { link: '', date: '', notes: '', done: false },
  existing: false,
  drillOpenInfo: (() => { throw new ReferenceError('drillOpenInfo not passed to Info'); }),
  drillSaveItem: (() => { throw new ReferenceError('drillSaveItem not passed to Info'); }),
};

export default Info;
