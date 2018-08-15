import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import '../css/Highlight.css';

const Highlight = (props) => {
  // TODO: If there's no item, render default.
  return (
    <section className="Highlight">
      <header className="secondary">Current Task:</header>
      <div>
        <Item item={props.item} />
      </div>
    </section>
  );
};

Highlight.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
};

Highlight.defaultProps = {
  item: {},
};

export default Highlight;
