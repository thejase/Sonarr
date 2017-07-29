import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './SelectInput.css';

class SelectInput extends Component {

  //
  // Listeners

  onChange = (event) => {
    this.props.onChange({
      name: this.props.name,
      value: event.target.value
    });
  }

  //
  // Render

  render() {
    const {
      className,
      disabledClassName,
      name,
      value,
      values,
      isDisabled,
      hasError,
      hasWarning
    } = this.props;

    return (
      <select
        className={classNames(
          className,
          hasError && styles.hasError,
          hasWarning && styles.hasWarning,
          isDisabled && disabledClassName
        )}
        disabled={isDisabled}
        name={name}
        value={value}
        onChange={this.onChange}
      >
        {
          values.map((option) => {
            const {
              key,
              value: optionValue,
              ...otherOptionProps
            } = option;

            return (
              <option
                key={key}
                value={key}
                {...otherOptionProps}
              >
                {optionValue}
              </option>
            );
          })
        }
      </select>
    );
  }
}

SelectInput.propTypes = {
  className: PropTypes.string,
  disabledClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

SelectInput.defaultProps = {
  className: styles.select,
  disabledClassName: styles.isDisabled,
  isDisabled: false
};

export default SelectInput;
