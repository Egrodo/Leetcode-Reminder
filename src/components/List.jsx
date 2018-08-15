import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import '../css/List.css';

const List = (props) => {
  const { data } = props;
  return (
    <section className="List">
      {data.map(item => <Item item={item} key={item.link} />)}
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
