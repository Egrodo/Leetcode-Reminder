import React, { Component } from 'react';
import Info from './Info';

class New extends Component {
  constructor() {
    super();
    this.state = {
      newItem: {
        link: '',
        date: '',
        notes: '',
        done: false,
      },
    };
  }

  saveNewItem(newItem) {
    console.log('Saving:');
    console.log(newItem);
  }

  render() {
    return (
      <section className="New page">
        <Info item={this.state.newItem} existing={false} saveItem={this.saveNewItem} />
      </section>
    );
  }
}

export default New;
