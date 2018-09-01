import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Info from './Info';

class New extends Component {
  constructor(props) {
    super(props);

    this.saveItem = this.saveItem.bind(this);
  }

  saveItem(newItem) {
    this.props.saveNewItem(newItem);
    this.props.drillPageType('main');
  }

  render() {
    return (
      <section className="New page">
        <Info existing={false} saveItem={this.saveItem} />
      </section>
    );
  }
}

New.propTypes = {
  saveNewItem: PropTypes.func,
  drillPageType: PropTypes.func,
};

New.defaultProps = {
  saveNewItem: (() => { throw new ReferenceError('saveNewItem func not passed to Main.'); }),
  drillPageType: (() => { throw new ReferenceError('drillPageType func not passed to Main.'); }),
};

export default New;
