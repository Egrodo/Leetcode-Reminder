import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../css/NumPicker.css';

const NumPicker = (props) => {
  const { type } = props;
  return (
    <span className="NumPicker">
      <div className="floater">
        <button className="numBtn" type="button" onClick={props.drillNumChange}>
          0
        </button>
        <button className="numBtn" type="button" onClick={props.drillNumChange}>
          1
        </button>
        <button className="numBtn" type="button" onClick={props.drillNumChange}>
          2
        </button>
        <button className="numBtn" type="button" onClick={props.drillNumChange}>
          3
        </button>
        <button className="numBtn" type="button" onClick={props.drillNumChange}>
          4
        </button>
        <button className="numBtn" type="button" onClick={props.drillNumChange}>
          5
        </button>
        <button className="numBtn" type="button" onClick={props.drillNumChange}>
          6
        </button>
        <button className="numBtn" type="button" onClick={props.drillNumChange}>
          7
        </button>
        {type === 'day'
          ? (
            <Fragment>
              <button className="numBtn" type="button" onClick={props.drillNumChange}>
                8
              </button>
              <button className="numBtn" type="button" onClick={props.drillNumChange}>
                9
              </button>
            </Fragment>
          )
          : ''
        }
      </div>
    </span>
  );
};

NumPicker.propTypes = {
  type: PropTypes.string,
  drillNumChange: PropTypes.func,
};

NumPicker.defaultProps = {
  type: 'week',
  drillNumChange: (() => { throw new ReferenceError('drillNumChange not passed into NumPicker'); }),
};

export default NumPicker;
