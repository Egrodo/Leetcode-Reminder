import React, { Component } from 'react';
import '../css/Navbar.css';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      active: 'main',
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    // Change tabs with prop func.
    if (this.state.active !== e.target.id) {
      this.setState({ active: e.target.id });
    }
  }

  render() {
    // TODO: Animate moving border on hover.
    const { active } = this.state;
    return (
      <div className="Navbar">
        <header className="title">Leetcode Reminders</header>
        <div className="navContainer">
          <button className={`navItem${active === 'main' ? ' active' : ''}`} id="main" type="button" onClick={this.onClick}>
            Main
          </button>
          <button className={`navItem${active === 'history' ? ' active' : ''}`} id="history" type="button" onClick={this.onClick}>
            History
          </button>
          <button className={`navItem${active === 'new' ? ' active' : ''}`} id="new" type="button" onClick={this.onClick}>
            New +
          </button>
        </div>
      </div>
    );
  }
}

export default Navbar;
