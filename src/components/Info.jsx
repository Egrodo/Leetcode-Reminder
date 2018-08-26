import React, { Component } from 'react';
import PropTypes from 'prop-types';
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


    this.onLinkClick = this.onLinkClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onLinkChange = this.onLinkChange.bind(this);
    this.onNotesChange = this.onNotesChange.bind(this);
  }

  componentWillMount() {
    const name = getName(this.props.item.link);
    this.setState({ name, ...this.props.item });
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

  onSaveClick() {
    // TODO: Save stuff and go back to main.
    console.log(this.state);
    this.props.drillOpenInfoItem(false);
  }

  render() {
    const { name, link, date, notes } = this.state;

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
          />
        </div>

        <div className="dateSelect">
          <header className="secondary">When?</header>
          <DatePicker date={date} />
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
            onChange={this.onNotesChange}
          >
            {notes}
          </textarea>
        </div>

        <button className="saveInfo" onClick={this.onSaveClick} type="submit">
          Save
        </button>
      </section>
    );
  }
}

Info.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  drillOpenInfoItem: PropTypes.func,
};

Info.defaultProps = {
  item: {},
  drillOpenInfoItem: (() => { throw new ReferenceError('drillOpenInfoItem not passed to List'); }),
};

export default Info;
