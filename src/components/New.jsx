import React from 'react';
import Info from './Info';

const New = () => {
  const newItem = {
    link: '',
    date: '',
    notes: '',
    done: false,
  };

  return (
    <section className="New page">
      <Info item={newItem} />
    </section>
  );
};

export default New;
