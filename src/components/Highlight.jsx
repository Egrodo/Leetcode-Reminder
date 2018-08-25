import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import '../css/Highlight.css';

const Highlight = props => (
  // TODO: Onclick for add one button.
  // TODO: Ensure highlight isn't done.
  <section className="Highlight">
    {props.item
      ? (
        <Fragment>
          <header className="secondary">Current Task:</header>
          <div className="highlightBox">
            <Item item={props.item} />
          </div>
        </Fragment>
      )
      : (
        <div className="noChallenge">
          <header className="secondary">No challenge today</header>
          <button type="button" className="addOne">
            Add one?
          </button>
        </div>
      )
    }
  </section>
);

Highlight.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
};

Highlight.defaultProps = {
  item: false,
};

export default Highlight;
