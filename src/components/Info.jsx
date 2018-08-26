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
  }

  componentWillMount() {
    const name = getName(this.props.item.link);
    this.setState({ name, ...this.props.item });
  }

  onLinkClick() {
    this.linkInput.current.select();
  }

  render() {
    const { name, link, date, notes, done } = this.state;

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

        <header className="secondary">When?</header>
        <DatePicker date={date} />

        <header className="secondary">Notes:</header>
        <textarea
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          type="text"
        >
          {notes}
        </textarea>
      </section>
    );
  }
}

Info.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
};

Info.defaultProps = {
  item: {},
};

export default Info;
