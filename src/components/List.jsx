import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import '../css/List.css';

const List = (props) => {
  const { data } = props;

  // Sort by date before rendering.
  data.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) return -1;
    return 1;
  });

  // Sort by done
  data.sort((a, b) => {
    if (a.done && !b.done) return 1;
    return -1;
  });

  return (
    <section className="List">
      <header className="secondary">Other Reminders:</header>
      <div className="itemContainer">
        {data.map(item => <Item item={item} key={item.link} />)}
      </div>
    </section>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

List.defaultProps = {
  data: [],
};

export default List;
